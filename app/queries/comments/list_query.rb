module Comments
  class ListQuery
    attr_accessor :per, :page, :entry_id

    def call(entry_id: nil, per: 10, page: 0)
      @per = per
      @page = page
      @entry_id = entry_id

      Comment.find_by_sql(sql)
    end

    private

    def sql
      <<-SQL
        SELECT
            main_comments.*,
            json_agg(
                json_build_object(
                    'id', comment_replies.id,
                    'user_id', comment_replies.user_id,
                    'entry_id', comment_replies.entry_id,
                    'body', comment_replies.body,
                    'created_at', comment_replies.created_at,
                    'parent_id', comment_replies.parent_id
                )
            ) as comment_replies
        FROM "comments" AS main_comments
            LEFT JOIN LATERAL (
                SELECT
                    comments.id as id,
                    comments.user_id as user_id,
                    comments.entry_id as entry_id,
                    comments.body as body,
                    comments.created_at as created_at,
                    comments.parent_id as parent_id
                FROM "comments"
                WHERE comments.parent_id = main_comments.id
                ORDER BY comments.created_at DESC
                LIMIT 2
            ) as comment_replies ON TRUE
        WHERE main_comments.parent_id IS NULL
        AND main_comments.entry_id = #{entry_id}
        GROUP BY main_comments.id
        ORDER BY main_comments.created_at DESC
        LIMIT #{limit}
        OFFSET #{offset}
      SQL
    end

    def limit
      per.to_i.zero? ? 10 : per.to_i
    end

    def offset
      page.to_i.zero? || page.to_i.eql?(1) ? 0 : (page.to_i - 1) * per.to_i
    end
  end
end
