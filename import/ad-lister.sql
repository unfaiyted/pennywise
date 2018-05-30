use adlister_test;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY  ,
    username varchar(100) NOT NULL ,
    password varchar(255) NOT NUll,
    email varchar(150) NOT NULL

);


CREATE TABLE ads (
     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
     title varchar(200) NOT NULL,
     description TEXT,
     owner_id INT NOT NULL
);



CREATE TABLE categories (
         id INT NOT NULL PRIMARY KEY   AUTO_INCREMENT ,
         name varchar(200) NOT NULL
);


CREATE TABLE ad_categories (
    ad_id INT NOT NULL,
    category_id INT NOT NULL
);


--
--For a given ad, what is the email address of the user that created it?
Select email
from users u
    inner join ads a ON  (a.owner_id = u.id)
WHERE
a.id = 1;



--For a given ad, what category, or categories, does it belong to?
select c.name from  ad_categories  ac
   inner join categories c ON (ac.category_id = c.id)
   inner join ads a ON (ac.ad_id = a.id)
   WHERE a.id = 1;


--For a given category, show all the ads that are in that category.
select a.* from ads a
inner join ad_categories ac ON (ac.ad_id = a.id)
inner join categories c ON (c.id = ac.category_id)
where c.name = 'Winning'

--For a given user, show all the ads they have posted.
select * from ads a where owner_id = 1;
-- OR
select a.* from ads a
  inner join users u ON (a.owner_id = u.id)
where u.username = 'test';