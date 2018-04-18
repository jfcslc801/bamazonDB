DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (01, "diesel jeans", "mens", 10.00, 10);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (02, "diesel shirt", "mens", 15.00, 1);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (03, "diesel shoes", "mens", 75.00, 10);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (04, "diesel socks", "mens", 5.00, 10);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (05, "shoe laces", "mens", 5.00, 10);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (06, "diesel backpack", "mens", 59.00, 70);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (07, "coffee cup", "home", 9.00, 50);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (08, "Dog Leash", "Pet", 19.00, 50);


INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (09, "lamp", "home", 25.00, 5);

INSERT INTO products (id, product_name, department_name, price, stock_quantity)
VALUES (10, "headphones", "electronics", 25.00, 5);


SELECT * FROM products;