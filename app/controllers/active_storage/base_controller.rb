# frozen_string_literal: true

# The base class for all Active Storage controllers.
module ActiveStorage
  class BaseController < ApplicationController
    include ActiveStorage::SetCurrent

    protect_from_forgery with: :null_session
  end
end
