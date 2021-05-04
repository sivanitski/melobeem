ActiveAdmin.register_page 'Dashboard' do # rubocop:disable Metrics/BlockLength
  menu priority: 1, label: proc { I18n.t('active_admin.dashboard') }

  content title: proc { I18n.t('active_admin.dashboard') } do # rubocop:disable Metrics/BlockLength
    columns do
      column do
        div class: 'votes-last-month' do
          h3 'Votes: Last Month'
          votes = Vote.select('created_at::date as created_at_day, sum(value) as vote_value')
                      .where('created_at::date >= ?::date', Time.current - 1.month)
                      .group('created_at_day')
                      .map { |v| [v.created_at_day, v.vote_value] }

          render partial: 'admin/dashboard/charts/votes_by_day', locals: { votes: votes }
        end
      end

      column do
        div class: 'users-last-month' do
          h3 'Users: Last Month'
          users = User.where('created_at::date >= ?::date', Time.current - 1.month)
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
          h3 'Purchases: Last Month'
          transactions = PurchaseTransaction.where(status: :done)
                                            .where('created_at::date >= ?::date', Time.current - 1.month)
                                            .group('created_at::date')
                                            .count
                                            .map { |u| [u.first, u.last] }

          render partial: 'admin/dashboard/charts/transactions_by_day', locals: { transactions: transactions }
        end
      end

      column do
        div class: 'purchases-last-month' do
          h3 'Entries: Last Month'
          entries = Entry.where('created_at::date >= ?::date', Time.current - 1.month)
                         .group('created_at::date')
                         .count
                         .map { |u| [u.first, u.last] }

          render partial: 'admin/dashboard/charts/entries_by_day', locals: { entries: entries }
        end
      end
    end
  end
end
