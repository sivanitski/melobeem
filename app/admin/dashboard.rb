ActiveAdmin.register_page 'Dashboard' do # rubocop:disable Metrics/BlockLength
  menu priority: 1, label: proc { I18n.t('active_admin.dashboard') }

  content title: proc { I18n.t('active_admin.dashboard') } do # rubocop:disable Metrics/BlockLength
    competition = Competition.current!

    columns do
      column do
        div class: 'votes-last-month' do
          h3 'Votes: Current competition'

          total_votes = Vote.joins(:entry).where(entries: { competition: competition }).count

          h4 "Total votes: #{total_votes}"

          votes = Vote.joins(:entry)
                      .where(entries: { competition: competition })
                      .select('votes.created_at::date as created_at_day, sum(votes.value) as vote_value')
                      .group('created_at_day')
                      .map { |v| [v.created_at_day, v.vote_value] }

          render partial: 'admin/dashboard/charts/votes_by_day', locals: { votes: votes }
        end
      end

      column do
        div class: 'users-last-month' do
          h3 'Users: Current competition'

          total_users = User.where('created_at::date >= ?::date', competition.starts_at).count

          h4 "Total users: #{total_users}"

          users = User.where('created_at::date >= ?::date', competition.starts_at)
                      .group('created_at::date')
                      .count
                      .map { |u| [u.first, u.last] }

          render partial: 'admin/dashboard/charts/users_by_day', locals: { users: users }
        end
      end
    end

    columns do
      column do
        div class: 'purchases-last-month' do
          h3 'Purchases: Current competition'

          total_transactions = PurchaseTransaction.where(status: :done).where(competition: competition).count

          h4 "Total transactions: #{total_transactions}"

          transactions = PurchaseTransaction.where(status: :done)
                                            .where(competition: competition)
                                            .group('created_at::date')
                                            .count
                                            .map { |u| [u.first, u.last] }

          render partial: 'admin/dashboard/charts/transactions_by_day', locals: { transactions: transactions }
        end
      end

      column do
        div class: 'purchases-last-month' do
          h3 'Entries: Current competition'

          total_entries = Entry.where(competition: competition).count

          h4 "Total entries: #{total_entries}"

          entries = Entry.where(competition: competition)
                         .group('created_at::date')
                         .count
                         .map { |u| [u.first, u.last] }

          render partial: 'admin/dashboard/charts/entries_by_day', locals: { entries: entries }
        end
      end
    end
  end
end
