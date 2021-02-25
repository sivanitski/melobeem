module API
  module V1
    class EntriesController < API::V1::ApplicationController
      skip_before_action :authenticate_user!, except: %i[create current]
      before_action :set_entry, only: %i[latest_voters voters_by_day total_votes_by_date]

      def index
        respond_with_item_list(
          ::Entries::WithRankQuery.new.call(@competition.id),
          ::Entries::RankedSerializer
        )
      end

      def show
        entry = ::Entries::WithRankQuery.new.call(@competition.id).find(params[:id])
        respond_with entry, serializer: ::Entries::RankedSerializer
      end

      def create
        entry = @competition.entries.new(entries_params.merge(user: current_user))

        if entry.save
          render json: entry, serializer: ::Entries::ShowSerializer
        else
          render_fail_response(entry.errors)
        end
      end

      def latest_voters
        users = ::Entries::LatestVotersQuery.new.call(@entry)

        if users.any?
          render json: users, each_serializer: ::Entries::LatestVotersSerializer
        else
          render json: { message: 'No voted' }, status: :not_found
        end
      end

      def total_votes_by_date
        total_votes = ::Entries::TotalVotesByDateQuery.new(entry: @entry, date: params[:date]).call

        render json: { total_votes: total_votes, date: params[:date] }
      end

      def current
        render json: @competition.entries.find_by!(user: current_user), serializer: ::Entries::CurrentSerializer
      end

      def search
        respond_with_item_list(
          ::Entries::SearchEntriesQuery.new.call(params[:q]),
          ::Entries::SearchSerializer
        )
      end

      def voters_by_day
        voters = ::Entries::VotersGroupByDayQuery.new(entry: @entry, page: params[:page], per: params[:per], date: params[:date]).call

        if voters.any?
          render json: voters, each_serializer: ::Entries::VotersByDaySerializer
        else
          render json: { message: 'No voted' }, status: :not_found
        end
      end

      private

      def entries_params
        params.require(:entry).permit(:gender, :name, :image, :total_votes)
      end

      def set_entry
        @entry = @competition.entries.find(params[:id])
      end
    end
  end
end
