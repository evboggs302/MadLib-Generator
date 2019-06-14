delete from shop
where user_id = $1 and prod_name = $2;

select * from shop
where user_id = $1;