module API
  module V1
    class EntriesController < API::V1::ApplicationController
      NO_LOGIN_ACTIONS = %i[index show latest_voters total_votes_by_date search voters_by_day ranking_details max_level_entry].freeze

      skip_before_action :authenticate_user!, only: NO_LOGIN_ACTIONS

      def index
        respond_with_item_list(
          ::Entries::WithRankQuery.new.call(competition.id),
          ::Entries::RankedSerializer
        )
      end

      def show
        entry_competition = Entry.find(params[:id]).competition
        entry = ::Entries::WithRankQuery.new.call(entry_competition.id).find(params[:id])
        respond_with entry, serializer: ::Entries::RankedSerializer
      end

      def create
        entry = competition.entries.new(entries_params.merge(user: current_user))

        if entry.save
          render json: entry, serializer: ::Entries::ShowSerializer
        else
          render_fail_response(entry.errors)
        end
      end

      def latest_voters
        users = ::Entries::LatestVotersQuery.new.call(entry)

        if users.any?
          render json: users, each_serializer: ::Entries::LatestVotersSerializer
        else
          render json: { message: 'No voted' }, status: :not_found
        end
      end

      def total_votes_by_date
        total_votes = ::Entries::TotalVotesByDateQuery.new(entry: entry, date: params[:date]).call

        render json: { total_votes: total_votes, date: params[:date] }
      end

      def current
        entry = ::Entries::WithRankQuery.new.call(competition.id).find_by!(user: current_user)
        respond_with entry, serializer: ::Entries::CurrentSerializer
      end

      def search
        respond_with_item_list(
          ::Entries::SearchEntriesQuery.new.call(params[:q]),
          ::Entries::SearchSerializer
        )
      end

      def voters_by_day
        voters = ::Entries::VotersGroupByDayQuery.new(entry: entry, page: params[:page], per: params[:per], date: params[:date]).call

        if voters.any?
          render json: voters, each_serializer: ::Entries::VotersByDaySerializer
        else
          render json: { message: 'No voted' }, status: :not_found
        end
      end

      def ranking_details
        entry = ::Entries::WithRankQuery.new.call(competition.id).find(params[:id])
        respond_with entry, serializer: ::Entries::RankingDetailsSerializer
      end

      def prize_by_level
        if prize && !prize.spent
          render json: prize, serializer: ::Entries::PrizeByLevelSerializer
        else
          render json: { prize: nil }, status: :ok
        end
      end

      def take_prize
        result = Prizes::Take.new(prize).call
        render json: result, adapter: nil, status: :ok
      end

      def prize_time
        prize_time = PrizeTime.not_expired.where(entry: entry)
        render json: { message: (prize_time.take.created_at + 24.hours).to_i }, adapter: nil, status: :ok if prize_time.any?
      end

      def max_level_entry
        render json: competition.entries.maximum('level'), adapter: nil, status: :ok
      end

      private

      def entries_params
        params.require(:entry).permit(:name, :image, :total_votes)
      end

      def entry
        @entry ||= competition.entries.find(params[:id])
      end

      def prize
        @prize ||= entry.prizes.find_by(level: params[:level])
      end
    end
  end
end
