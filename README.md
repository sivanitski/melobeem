# Melobeem: Contest application

* Ruby version: 2.7.2
* Rails version: 6.1.1

## Initial setup:
**Add environment file .env into root folder with next:**

    .env
    DB_USER_PASSWORD=postgres
    DB_HOST=db
    FACEBOOK_APP_ID=935762250563722
    FACEBOOK_APP_SECRET=c7f85b4a056c755c062ee7de4bcba2d1

**First setup**

    1. docker-compose up -d
    2. docker ps
    3. take docker container_id for container "irb"
    4. docker exec -it container_id /bin/bash
    5. bundle install
    6. yarn
    7. rails db:setup
    8. exit

**Run application**

    docker-compose up -d rails
    docker-compose run runner # for commands from console

check http://localhost:3000/
