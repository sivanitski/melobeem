require 'ffaker'

competition = Competition.create!(title: 'Kiddy')

# generate 20 users
(1..20).each do |id|
  User.create!(
    id: id,
    name: FFaker::Name.name,
    email: FFaker::Internet.email,
    password: "password",
    password_confirmation: "password",
  )
end

# generate 20 entries
(1..20).each do |id|
  Entry.create!(
    id: id,
    gender: FFaker::Gender.binary,
    user_id: id,
    competition_id: competition.id
  )
end

#generate 2000 votes
(1..2000).each do |id|
  Vote.create!(
    id: id,
    entry_id: rand(1..20),
    user_id: rand(1..20)
  )
end
