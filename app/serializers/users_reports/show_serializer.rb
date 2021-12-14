module UsersReports
  class ShowSerializer < ::BaseSerializer
    attributes :id, :report_type, :status, :target, :details
  end
end
