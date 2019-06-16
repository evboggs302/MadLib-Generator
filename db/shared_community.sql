select to_char(h.date_made :: DATE, 'Mon dd, yyyy'), h.story, h.title, u.user_id , u.username from history h
join users u on (u.user_id = h.user_id)
where h.share is true
order by h.date_made desc;