-- Table du template du repo

create table item (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null
);

-- Notre database

CREATE TABLE user (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(20) NOT NULL,
  admin BOOLEAN NOT NULL  
);

CREATE TABLE group_table (
   id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
   name VARCHAR(20) NOT NULL
);

--table d'association user et group

CREATE TABLE user_group (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
user_id INT NOT NULL,
group_id INT NOT NULL,
message TEXT NOT NULL,
CONSTRAINT fk_user-group_user
    FOREIGN KEY (user_id)
    REFERENCES user(id),
CONSTRAINT fk_user-group_group
  FOREIGN KEY (group_id)
  REFERENCES group_table(id)    
);

--test de requête mySQL : récupérer les users, leur groupe et leur message :
-- mysql> SELECT u.name AS user_name, g.name AS group_name, ug.message
--     -> FROM user_group AS ug
--     -> JOIN user AS u ON u.id = ug.user_id
--     -> JOIN group_table AS g ON g.id = ug.group_id;

-- exemple (avec fake data ChatGTP)
-- +---------------+------------+---------------------------------+
-- | user_name     | group_name | message                         |
-- +---------------+------------+---------------------------------+
-- | John Doe      | Group A    | Hello from John to Group A      |
-- | Jane Smith    | Group A    | Message from Jane to Group A    |
-- | Alice Johnson | Group B    | Greetings from Alice to Group B |
-- +---------------+------------+---------------------------------+
-- 3 rows in set (0.00 sec)

CREATE TABLE category_document (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    private BOOLEAN NOT NULL
);

CREATE TABLE document (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  path VARCHAR(255) NOT NULL,
  category_document_id INT NOT NULL,
  user_id INT NOT NULL,
  group_id INT NOT NULL,
  CONSTRAINT fk_document_category
    FOREIGN KEY (category_document_id)
    REFERENCES category_document(id),
    CONSTRAINT fk_user
    FOREIGN KEY (user_id)
    REFERENCES user(id),
  CONSTRAINT fk_document_group
    FOREIGN KEY (group_id)
    REFERENCES group_table(id)
);

CREATE TABLE category_transaction (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    name VARCHAR(50) NOT NULL
);

CREATE TABLE transaction (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    sum DECIMAL NOT NULL,
    date DATE NOT NULL,
    type VARCHAR(50) NOT NULL,
    category_transaction_id INT NOT NULL,
    group_id INT NOT NULL, 
    user_id INT NOT NULL, 
        CONSTRAINT fk_transaction_category_transaction
            FOREIGN KEY (category_transaction_id)
            REFERENCES category_transaction(id),
        CONSTRAINT fk_transaction_group
            FOREIGN KEY (group_id)
            REFERENCES group_table(id),
        CONSTRAINT fk_transaction_user
            FOREIGN KEY (user_id)
            REFERENCES user(id)
);


CREATE TABLE category_task (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE task (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    private BOOLEAN NOT NULL,
    done BOOLEAN NOT NULL,
    category_task_id INT NOT NULL,
    user_id INT NOT NULL,
    group_id INT NOT NULL,
        CONSTRAINT fk_task_category_task
            FOREIGN KEY (category_task_id)
            REFERENCES category_task(id),
        CONSTRAINT fk_task_user
            FOREIGN KEY (user_id)
            REFERENCES user(id),
        CONSTRAINT fk_task_group
            FOREIGN KEY (group_id)
            REFERENCES group_table(id)
);

