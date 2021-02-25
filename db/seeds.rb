require 'ffaker'

competition = Competition.create!(title: 'Kiddy',
                                  prize_cents: 10_000,
                                  starts_at: DateTime.now.beginning_of_month,
                                  ends_at: DateTime.now.end_of_month)

# generate 20 users with avatars
avatars = Pathname.glob('db/fixtures/user_avatars/*')

20.times do
  User.create!(
    name: FFaker::Name.name,
    email: FFaker::Internet.email,
    provider: FFaker::Internet.domain_word,
    uid: FFaker::Internet.slug,
    password: "password",
    password_confirmation: "password",
  )
end

User.all.find_each do |user|
  avatar = avatars[user.id - 1]
  user.avatar.attach(io: avatar.open, filename: avatar.basename)
end

#generate 20 entries with images
images = Pathname.glob('db/fixtures/entry_images/*')

User.all.find_each do |user|
  Entry.create!(
    name: FFaker::Name.name,
    gender: FFaker::Gender.binary,
    user_id: user.id,
    competition_id: competition.id
  )
end

Entry.all.find_each do |entry|
  image = images[entry.id - 1]
  entry.image.attach(io: image.open, filename: image.basename)
end

# generate votes

# level 1: from 0 to 1 votes
Entry.where(id: 1..3).each { |entry| Vote.create!(entry: entry, user_id: User.pluck(:id).sample, source_type: :user) }

# level 2: from 2 to 4 votes
Entry.where(id: 4..6).each { |entry| Vote.create!(entry: entry, user_id: User.pluck(:id).sample, value: rand(2..4), source_type: :user) }

# level 3: from 5 to 9 votes
Entry.where(id: 7..9).each { |entry| Vote.create!(entry: entry, user_id: User.pluck(:id).sample, value: rand(5..9), source_type: :user) }

# level 4: from 10 to 14 votes
Entry.where(id: 10..12).each { |entry| Vote.create!(entry: entry, user_id: User.pluck(:id).sample, value: rand(10..14), source_type: :user) }

# level 5: from 15 to 19 votes
Entry.where(id: 13..15).each { |entry| Vote.create!(entry: entry, user_id: User.pluck(:id).sample, value: rand(15..19), source_type: :user) }

# level 6: from 20 to 29 votes
Entry.where(id: 16..20).each { |entry| Vote.create!(entry: entry, user_id: User.pluck(:id).sample, value: rand(20..29), source_type: :user) }

# summarize votes into total_votes
Entry.all.find_each { |entry| entry.update(total_votes: Vote.where(entry: entry).sum(:value)) }
