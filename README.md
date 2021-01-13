# Melobeem: Contest application

* Ruby version: 2.7.2
* Rails version: 6.1.1

## Initial setup:
**Add environment file .env into root folder with next:**

    .env
    DB_USER_PASSWORD=postgres
    DB_HOST=db
    
**First setup**

    1. docker-compose run runner
    2. bundle install
    3. yarn
    4. rails db:setup
    5. exit

**Run application**

    docker-compose up -d rails
    docker-compose run runner # for commands from console
   
check http://localhost:3000/
