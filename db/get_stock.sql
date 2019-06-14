select * from shop
where user_id is null or user_id = $1;