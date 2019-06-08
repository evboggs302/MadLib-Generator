drop table if exists shop;
drop table if exists templates;
drop table if exists history;
drop table if exists users;

--

create table users (
    user_id serial primary key,
    call_name varchar,
    username varchar not null,
    email text not null,
    password text not null
);

insert into users (call_name, username, email, password)
values
('Evan Boggs', 'evboggs', 'evan@evan.com', 'evan');

select * from users;

--

create table templates (
    user_id int references users(user_id),
    story_id serial primary key,
    title varchar(100),
    blanks text[],
    lines text[]
);

insert into templates (title, blanks, lines)
values
('How To Cross a Piranha-Infested River', ARRAY ['foreign country',
      'adverb',
      'adjective',
      'animal',
      'verb ending in ''ing''',
      'verb',
      'verb ending in ''ing''',
      'adverb',
      'adjective',
      'a place',
      'type of liquid',
      'part of the body',
      'verb'] , ARRAY ['If you are traveling in ',
       'and find yourself having to cross a piranha-filled river', 'here''s how to do it ',
      '. First, Piranhas are more ',
       'during the day, so cross the river at night. Second, avoid areas with netted ',
       'traps--piranhas may be ',
       'there looking to ',
       'them! Third, when ',
       'the river, swim ',
      '. You don''t want to wake them up and make them ',
      '! Lastly, whatever you do, if you have an open wound, try to find another way to get back to the ',
      '. Piranhas are attracted to fresh ',
       'and will most likely take a bite out of your ',
       'if you ',
       'in the water!', '0']),
('Three Little Pigs', ARRAY [
      'adjective',
      'verb',
      'verb',
      'verb',
      'plural noun',
      'verb',
      'verb',
      'past tense verb',
      'plural noun',
      'adjective',
      'verb',
      'plural noun',
      'noun',
      'verb',
      'past tense verb',
      'noun',
      'noun',
      'noun',
      'past tense verb',
      'adjective',
      'past tense verb',
      'past tense verb',
      'noun',
      'past tense verb'
    ], ARRAY ['Once up a time, there were three ',
      ' pigs. One day, their mother said, ''"''You are all grown up and must ',
      ' on your own.''"'' So they left to ',
      ' their houses. The first little pig wanted only to ',
      ' all day and quickly built his house out of ',
      '. The second little pig wanted to ',
      ' and ',
      ' all day so he ',
      ' his house with ',
      '. The third ',
      ' pig knew the wolf lived nearby and worked hard to ',
      ' his house out of ',
      '. One day, the wolf knocked on the first pig''s ',
      '. ''"''Let me in or I''ll ',
      ' your house down!''"'' The pig didn''t, so the wolf ',
      ' down the ',
      '. The wolf knocked on the second pig''s ',
      '. ''"''Let me in or I''ll blow your ',
      ' down!''"'' The pig didn''t, so the wolf ',
      ' down the house. Then the wolf knocked on the third ',
      ' pig''s door. ''"''Let me in or I''ll blow your house down!''"'' The little pig didn''t so the wolf ',
      ' and ',
      '. He couldn''t blow the house down. All the pigs went to live in the ',
      ' house and they all ',
      ' happily ever after.', '0']),
('Talk Like a Pirate', ARRAY ['noun',
      'adjective',
      'verb',
      'adverb',
      'noun',
      'adjective',
      'plural noun',
      'plural noun',
      'plural noun',
      'part of the body',
      'noun',
      'noun',
      'noun',
      'noun',
      'part of the body'], ARRAY ['Ye can always pretend to be a bloodthirsty ',
      ', threatening everyone by waving yer ',
      ' sword in the air, but until ye learn to ',
      ' like a pirate, ye''ll never be ',
      ' accepted as an authentic ',
      '. So here''s what ye do: Cleverly work into yer daily conversations ',
      ' pirate phrases such as ''"''Ahoy there, ',
      ',''"'' ''"''Avast, ye ',
      ',''"'' and ''"''Shiver me ',
      '.''"'' Remember to drop all yer g''s when ye say such words as sailin'', spittin'', and fightin''. This will give ye a/an ',
      ' start to being recognized as a swashbucklin'' ',
      '. Once ye have the lingo down pat, it helps to wear a three-cornered ',
      ' on yer head, stash a/an ',
      ' in yer pants, and keep a/an ',
      ' perched atop yer ',
      '. Aye, now ye be a real pirate!',
      '0']),
('How to Date the Coolest Guy/Girl in School', ARRAY ['plural noun',
      'adverb',
      'verb',
      'article of clothing',
      'body part',
      'adjective',
      'noun',
      'plural noun',
      'another body part',
      'plural noun',
      'another body part',
      'noun',
      'noun',
      'verb ending in ''ing''',
      'adjective',
      'adjective',
      'verb'], ARRAY ['It''s simple. Turn the ',
      '. Make him/her want ',
      ' to date you. Make sure you''re always dressed to ',
      '. Each and every day, wear a/an ',
      ' that you know shows off your ',
      ' to ',
      ' advantage and make your ',
      ' look like a million ',
      '. Even if the two of you make meaningful ',
      ' contact, don''t admit it. No hugs or ',
      '. Just shake his/her ',
      ' firmly. And remember, when he/she asks you out, even though a chill may run down your ',
      ' and you can''t stop your ',
      ' from ',
      ', just play it ',
      '. Take a long pause before answering in a very ',
      ' voice. ''"''I''ll have to ',
      ' it over.''"''',
      '0']);

select * from templates;

--

create table history (
    user_id int references users(user_id),
    history_id serial primary key,
    title text,
    story text[],
    date_made date,
    time_made time
);

--

create table shop (
    user_id int references users(user_id),
    prod_id serial primary key,
    prod_img text,
    prod_name varchar,
    prod_price numeric,
    quant int
);

insert into shop (prod_img, prod_name, prod_price, quant)
values
('https://images.penguinrandomhouse.com/cover/9781524785864', 'StarWars Mad Libs', 8.50, 4),
('https://lh3.googleusercontent.com/proxy/4I-m6lx-k_KEcnwJWYqeleUH4x-SDpmOSaAyAEJmDzuU8KHHgJGF-GG7OwmmuQSs4NSl8CzXUoJLNSUHDp8T9tYbcug91OdN60vftlBmlmb0Ipm8WK-Uy2uR-vOPR2ZEsVBeL18sTaL4f_u5JnfrlHBsYykaOBTmkz8lUP7jMUEts-sN-6I=s500-pd-e365-rw-pc0xffffff', 'Rick and Morty Mad Libs', 1.37, 69),
('https://www.eurekapuzzles.com/components/com_virtuemart/shop_image/product/33840.jpg', 'Adult Mad Libs Game', 6.90, 12);

select * from shop;