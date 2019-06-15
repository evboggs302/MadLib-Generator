delete from library
where story_id = $1;

select * from library
where user_id is null or user_id =$2