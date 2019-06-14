update history
set share = NOT share
where history_id = $2;


select user_id, history_id, share, title, story, to_char(date_made :: DATE, 'Mon dd, yyyy') from history
where user_id = $1
order by date_made asc;