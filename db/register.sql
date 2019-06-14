insert into users(call_name, username, email, password)
values
($1, $2, $3, $4);

select username, email, user_id  from users
where email = $3;