FROM ruby:2.7.2-alpine as Builder

ARG RAILS_ENV
ARG DB_USER_PASSWORD
ARG DB_HOST
ARG FACEBOOK_APP_ID
ARG FACEBOOK_APP_SECRET
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_BUCKET_NAMES3_BUCKET
ARG REDIS_DB
ARG REDIS_URL=redis://redis:6379/
ARG STRIPE_PUBLISHABLE_KEY
ARG STRIPE_SECRET_KEY
ARG STRIPE_ENDPOINT_SECRET
ARG ACTIVE_STORAGE_HOST
ARG IMGPROXY_KEY
ARG IMGPROXY_SALT
ARG IMGPROXY_ENDPOINT

ENV RAILS_ENV=production
ENV SECRET_KEY_BASE foo
ENV RAILS_SERVE_STATIC_FILES true
ENV DB_USER_PASSWORD=$DB_USER_PASSWORD
ENV DB_HOST=$DB_HOST
ENV FACEBOOK_APP_ID=$FACEBOOK_APP_ID
ENV FACEBOOK_APP_SECRET=$FACEBOOK_APP_SECRET
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_BUCKET_NAMES3_BUCKET=$AWS_BUCKET_NAMES3_BUCKET
ENV REDIS_DB=$REDIS_DB
ENV REDIS_URL=$REDIS_URL
ENV STRIPE_PUBLISHABLE_KEY=$STRIPE_PUBLISHABLE_KEY
ENV STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
ENV STRIPE_ENDPOINT_SECRET=$STRIPE_ENDPOINT_SECRET
ENV ACTIVE_STORAGE_HOST=$ACTIVE_STORAGE_HOST
ENV IMGPROXY_KEY=$IMGPROXY_KEY
ENV IMGPROXY_SALT=$IMGPROXY_SALT
ENV IMGPROXY_ENDPOINT=$IMGPROXY_ENDPOINT

RUN apk add --update --no-cache \
    build-base \
    postgresql-dev \
    git \
    nodejs \
    yarn \
    tzdata

WORKDIR /app

# Install gems
ADD Gemfile* /app/
RUN gem install bundler:2.2.5
RUN bundle config --global frozen 1 \
 && bundle install -j4 --retry 3 \
 # Remove unneeded files (cached *.gem, *.o, *.c)
 && rm -rf /usr/local/bundle/cache/*.gem \
 && find /usr/local/bundle/gems/ -name "*.c" -delete \
 && find /usr/local/bundle/gems/ -name "*.o" -delete

# Install yarn packages
COPY package.json yarn.lock /app/
RUN yarn install --check-files

# Add the Rails app
ADD . /app

# Precompile assets
RUN RAILS_ENV=production bundle exec rake webpacker:compile

###############################
# Stage Final
FROM ruby:2.7.2-alpine

# Add Alpine packages
RUN apk add --update --no-cache \
    postgresql-client \
    tzdata \
    file

# Add user
RUN addgroup -g 1000 -S app \
 && adduser -u 1000 -S app -G app
USER app

# Copy app with gems from former build stage
COPY --from=Builder /usr/local/bundle/ /usr/local/bundle/
COPY --from=Builder --chown=app:app /app /app

# Set Rails env
ENV RAILS_LOG_TO_STDOUT true
ENV RAILS_SERVE_STATIC_FILES true

WORKDIR /app

# Expose Puma port
EXPOSE 3000

# Save timestamp of image building
RUN date -u > BUILD_TIME

# Start up
CMD ["tail -f /dev/null"]
