DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id MEDIUMINT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  product_sales DECIMAL(10,2) NOT NULL DEFAULT '0',
  PRIMARY KEY (id)
);

INSERT INTO products (id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (01, "diesel jeans", "mens", 10.00, 10, 0);

INSERT INTO products (id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (02, "diesel shirt", "mens", 15.00, 1, 0);

INSERT INTO products (id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (03, "diesel shoes", "mens", 75.00, 10, 0);

INSERT INTO products (id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (04, "diesel socks", "mens", 5.00, 10, 0);

INSERT INTO products (id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (05, "shoe laces", "mens", 5.00, 10, 0);

INSERT INTO products (id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (06, "diesel backpack", "mens", 59.00, 70, 0);

INSERT INTO products (id, product_name, department_name, price, stock_quantity,  product_sales)
VALUES (07, "coffee cup", "home", 9.00, 50, 0);

INSERT INTO products (id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (08, "Dog Leash", "Pet", 19.00, 50, 0);


INSERT INTO products (id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (09, "lamp", "home", 25.00, 5, 0);

INSERT INTO products (id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (10, "headphones", "electronics", 25.00, 5, 0);


SELECT * FROM products;