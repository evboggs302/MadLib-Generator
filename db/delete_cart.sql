delete from shop
where user_id = $1;

select * from shop
where user_id = $1;