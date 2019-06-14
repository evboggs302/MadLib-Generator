insert into shop (user_id, prod_img, prod_name, prod_price, quant)
values
($1, $2, $3, $4, $5);

select * from shop
where user_id = $1