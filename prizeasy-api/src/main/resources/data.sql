INSERT IGNORE INTO roles (id, name) VALUES (1, 'USER'), (2, 'ADMIN');

INSERT IGNORE INTO categories (id, name) VALUES
(1, 'Electronics'),
(2, 'Gift Cards'),
(3, 'Home'),
(4, 'Gaming');

INSERT IGNORE INTO users (name, email, dni, password, points, role_id) VALUES
('Juan Perez','juan@email.com','12345678','$2a$12$wnOC4PO79ZY7U7YQoCgow.Awkgl1/bHwqAB6wwg0TqUM.JPNm/t9C',500,1),
('Maria Lopez','maria@email.com','87654321','$2a$12$TUt3eBW4MfarTzxpul8pu.DoFc.6Af/XnvahDH97EhV1EFJg.ipqW',800,1),
('Admin','admin@email.com','99999999','$2a$12$jl.4BzYRoXG.qa/mvKhqKeLmytyCEgfBcIsW0tcWwtNobVx30zLpm',0,2);

INSERT IGNORE INTO products (name, description, points_cost, stock, image_url, category_id) VALUES
('Logitech Mouse','Wireless mouse',300,50,'/images/products/mouse.jpg',1),
('Mechanical Keyboard','RGB keyboard',700,30,'/images/products/keyboard.jpg',1),
('Amazon Gift Card','$25 gift card',500,100,'/images/products/amazon.jpg',2),
('PlayStation Gift Card','$50 PSN card',900,80,'/images/products/psn.jpg',4);