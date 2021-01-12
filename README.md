# Melobeem: Contest application

* Ruby version: 2.7.1
* Rails version: 6.1.1

## Initial setup:
**Add environment file .env into root folder with next:**

    .env
    DB_USER_PASSWORD=postgres
    DB_HOST=db
   
**Install gems**

    bundle install
    
**Build docker container**

    docker build -t melobeem .
    
**Run migrations for container**

    docker-compose run web rails db:setup
    
**Run application**

    docker-compose up
    
   
check http://localhost:3000/
