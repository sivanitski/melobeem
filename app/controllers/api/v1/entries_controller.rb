module API
  module V1
    class EntriesController < API::V1::ApplicationController # rubocop:disable Metrics/ClassLength
      NO_LOGIN_ACTIONS = %i[index create show new latest_voters total_votes_by_date search voters_by_day ranking_details max_level_entry].freeze

      skip_before_action :authenticate_user!, only: NO_LOGIN_ACTIONS

      protect_from_forgery with: :null_session

      def index
        respond_with_item_list(
          ::Entries::WithRankQuery.new.call(competition.id, params[:level]),
          ::Entries::RankedSerializer
        )
      end

      def new
        return render json: { entry: nil } if current_user.blank?

        entry = current_user.entries.order(created_at: :desc).first

        return render json: { entry: nil } if entry.blank?

        respond_with entry, serializer: ::Entries::NewSerializer
      end

      def show # rubocop:disable Metrics/AbcSize
        entry_competition = Entry.find(params[:id]).competition
        entry = ::Entries::WithRankQuery.new.call(entry_competition.id).find(params[:id])

        setup_meta_tags(entry)

        if request.format&.symbol.eql?(:json)
          respond_with entry, serializer: ::Entries::RankedSerializer, country: country
        else
          render template: 'api/v1/entries/show', layout: 'application'
        end
      end

      def create # rubocop:disable Metrics/AbcSize
        entry = competition.entries.new(entries_params)

        previous_entry = current_user.entries.order(created_at: :desc).first if current_user.present?

        if entry.save
          ::Prizes::AwardEntryWithSecretPrize.new(previous_entry).call if current_user.present? && previous_entry.present?

          entry = competition.entries.find_by!(id: entry.id)
          render json: entry, serializer: ::Entries::ShowSerializer
        else
          render_fail_response(entry.errors.full_messages.first)
        end
      end

      def update
        entry = Entry.find(params[:id])

        if entry.update(update_params)
          entry = ::Entries::WithRankQuery.new.call(competition.id).find_by!(user: current_user)
          render json: entry, serializer: ::Entries::RankedSerializer
        else
          render_fail_response(entry.errors.full_messages.first)
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
        votes = ::Entries::TotalVotesByDateQuery.new(entry: entry, per: params[:per], page: params[:page]).call

        render json: votes, each_serializer: ::Entries::TotalVotesByDateSerializer
      end

      def current
        entry_competition = current_user.entries.order(created_at: :desc).first&.competition || competition
        entry = ::Entries::WithRankQuery.new.call(entry_competition.id).find_by!(user: current_user)
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

      def prizes
        render json: entry.prizes, each_serializer: ::Entries::PrizeByLevelSerializer
      end

      def take_prize
        result = Prizes::Take.new(prize).call
        render json: result, adapter: nil, status: :ok
      end

      def prize_time
        prize_time = PrizeTime.not_expired.where(entry: entry)
        return unless prize_time.any?

        render json: { message: (prize_time.take.created_at + 24.hours).to_i, value: prize_time.take.value },
               adapter: nil, status: :ok
      end

      def max_level_entry
        render json: competition.entries.maximum('level'), adapter: nil, status: :ok
      end

      def certificate # rubocop:disable Metrics/MethodLength
        entry = current_user.entries.find(params[:id])

        if entry.in?(current_user.entries)
          pdf = WickedPdf.new.pdf_from_string(
            render_template(entry),
            encoding: 'utf-8',
            lowquality: false,
            orientation: 'Landscape',
            margin: { top: 0, bottom: 0, left: 0, right: 0 }
          )

          send_data(pdf, filename: "#{entry.name}.pdf", type: 'application/pdf')
        else
          render_fail_response('Certificate was not found')
        end
      end

      private

      def entries_params
        params.require(:entry).permit(
          :name,
          :user_id,
          :image,
          :total_votes,
          :transformations
        )
      end

      def update_params
        params.require(:entry).permit(:user_id)
      end

      def entry
        @entry ||= competition.entries.find(params[:id])
      end

      def render_template(entry)
        ActionController::Base.new.render_to_string(
          'certificate/winner',
          layout: false,
          locals: { entry: entry }
        )
      end

      def prize
        @prize ||= entry.prizes.find_by(level: params[:level])
      end

      def setup_meta_tags(entry)
        @page_title = "Check out #{entry.user.name.split(' ').first}'s entry on Melobeem.com"
        @page_description = "Help them win a cash prize and certificate for their baby #{entry.name}."
        @page_url = "https://melobeem.com/entry/#{entry.id}"
        @page_image = entry.image.variant(format: :jpg, resize_to_limit: [1200, 628]).processed.service_url if entry.image.attached?
      end
    end
  end
end
