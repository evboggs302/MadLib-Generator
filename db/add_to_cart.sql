insert into shop (user_id, prod_name, prod_price)
values
($1, $2, $3);

select * from shop
where user_id = $1