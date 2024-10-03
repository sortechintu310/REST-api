-- CREATE TABLE users(
-- id SERIAL PRIMARY KEY,
-- email TEXT,
-- password TEXT
-- );
-- INSERT INTO users(email,password) VALUES('sortechintu230@gmail.com','rgb');
-- SELECT *FROM users;

-- CREATE TABLE products(
-- 	id SERIAL PRIMARY KEY,
-- 	image TEXT NOT NULL,
-- 	category VARCHAR(45),
-- 	sub_category VARCHAR(45),
-- 	name VARCHAR(55) NOT NULL,
-- 	price FLOAT NOT NULL
-- );
-- SELECT *FROM products;
-- products data imported from csv file

-- CREATE TABLE cart(
-- 	id SERIAL PRIMARY KEY,
-- 	user_id INTEGER REFERENCES users(id),
-- 	item_id INTEGER REFERENCES products(id)
-- );

-- SELECT *FROM users,cart,products;

-- INSERT INTO users(email,password) VALUES('sortec0@gmail.com','rrgb');
-- INSERT INTO cart(user_id,item_id) VALUES(2,3),(2,55),(2,46);

-- SELECT name,price,category FROM products JOIN cart ON products.id = cart.item_id WHERE cart.user_id = 2;
-- SELECT name,price,email FROM products, users, cart WHERE users.id = cart.user_id;
