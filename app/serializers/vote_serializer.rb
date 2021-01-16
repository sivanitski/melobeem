class VoteSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :entry_id, :value, :created_at, :updated_at
end
