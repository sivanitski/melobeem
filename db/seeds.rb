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

# generate 20 entries with images
images = Dir.glob('app/javascript/images/mockphotos/*.{jpg,gif,png,jpeg}')

(1..20).each do |id|
  entry = Entry.create!(
    id: id,
    gender: FFaker::Gender.binary,
    user_id: id,
    competition_id: competition.id
  )
  url = images[id - 1]
  filename = File.basename(URI.parse(url).path)
  file = URI.open(url)
  entry.image.attach(io: file, filename: filename)
end

#generate 2000 votes
(1..2000).each do |id|
  Vote.create!(
    id: id,
    entry_id: rand(1..20),
    user_id: rand(1..20)
  )
end
