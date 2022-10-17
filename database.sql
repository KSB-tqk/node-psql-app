CREATE TABLE restaurants (
	id BIGSERIAL NOT NULL PRIMARY KEY, 
	name VARCHAR(50),
    location VARCHAR(255),
    price_range INT NOT NULL,
	on_sale BOOLEAN
);