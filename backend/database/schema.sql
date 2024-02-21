-- Table du template du repo

create table item (
  id int unsigned primary key auto_increment not null,
  title varchar(255) not null
);

-- Notre database

CREATE TABLE user (
  u_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  u_name VARCHAR(20) NOT NULL,
  u_email VARCHAR(50) NOT NULL,
  u_password VARCHAR(20) NOT NULL,
  u_admin BOOLEAN NOT NULL  
);

CREATE TABLE group_table (
   g_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
   g_name VARCHAR(20) NOT NULL
);

--table d'association user et group

CREATE TABLE user_group (
ug_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
ug_user_id INT NOT NULL,
ug_group_id INT NOT NULL,
ug_message TEXT NOT NULL,
-- à checker
CONSTRAINT fk_user-group_user
    FOREIGN KEY (ug_user_id)
    REFERENCES user(u_id),
CONSTRAINT fk_user-group_group
  FOREIGN KEY (ug_group_id)
  REFERENCES group_table(g_id)    
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
    cd_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cd_name VARCHAR(50) NOT NULL,
    cd_private BOOLEAN NOT NULL
);

-- ajouter un timestamp si on veut trier les docs par date de création
CREATE TABLE document (
  d_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  d_name VARCHAR(50) NOT NULL,
  d_path VARCHAR(255) NOT NULL,
  d_category_document_id INT NOT NULL,
  d_user_id INT NOT NULL,
  d_group_id INT NOT NULL,
  CONSTRAINT fk_document_category
    FOREIGN KEY (d_category_document_id)
    REFERENCES category_document(cd_id),
  CONSTRAINT fk_document_user
    FOREIGN KEY (d_user_id)
    REFERENCES user(u_id),
  CONSTRAINT fk_document_group
    FOREIGN KEY (d_group_id)
    REFERENCES group_table(g_id)
);

CREATE TABLE category_transaction (
    ctra_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    ctra_name VARCHAR(50) NOT NULL
);

CREATE TABLE transaction (
    tr_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    tr_name VARCHAR(50) NOT NULL,
    tr_sum DECIMAL NOT NULL,
    tr_date DATE NOT NULL,
    tr_type VARCHAR(50) NOT NULL,
    tr_cat_transaction_id INT NOT NULL,
    tr_group_id INT NOT NULL, 
    tr_user_id INT NOT NULL, 
        CONSTRAINT fk_transaction_category-trans
            FOREIGN KEY (tr_cat_transaction_id)
            REFERENCES category_transaction(ctra_id),
        CONSTRAINT fk_transaction_group
            FOREIGN KEY (tr_group_id)
            REFERENCES group_table(g_id),
        CONSTRAINT fk_transaction_user
            FOREIGN KEY (tr_user_id)
            REFERENCES user(u_id)
);


CREATE TABLE category_task (
    cta_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cta_name VARCHAR(50) NOT NULL
);

CREATE TABLE task (
    ta_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    ta_name VARCHAR(50) NOT NULL,
    ta_private BOOLEAN NOT NULL,
    ta_done BOOLEAN NOT NULL,
    ta_cat_task_id INT NOT NULL,
    ta_user_id INT NOT NULL,
    ta_group_id INT NOT NULL,
        CONSTRAINT fk_task_category-task
            FOREIGN KEY (ta_cat_task_id)
            REFERENCES category_task(cta_id),
        CONSTRAINT fk_task_user
            FOREIGN KEY (ta_user_id)
            REFERENCES user(u_id),
        CONSTRAINT fk_task_group
            FOREIGN KEY (ta_group_id)
            REFERENCES group_table(g_id)
);

-- // renommer les champs des tables : exemple user_name au lieu de name
-- // recipe 
-- // position_table
-- // position_user
-- // contact 
-- // category_contact
-- // event 
-- // remind_event

-- à checker
CREATE TABLE position_table (
    pos_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    pos_longitude DECIMAL(10, 5) NOT NULL,
    pos_latitude DECIMAL(10, 5) NOT NULL,
    pos_name VARCHAR(255)NOT NULL
);

-- à checker
CREATE TABLE position_user (
    pu_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    pu_user_id INT NOT NULL,
    pu_position_id INT NOT NULL,
    CONSTRAINT fk_position-user_user
        FOREIGN KEY (pu_user_id)
        REFERENCES user(u_id),
    CONSTRAINT fk_position-user_position
        FOREIGN KEY (pu_position_id)
        REFERENCES position_table(pos_id)
);

-- à checker
CREATE TABLE recipe (
    r_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    r_name VARCHAR(50) NOT NULL,
    r_description VARCHAR(255)  NULL,
    r_time_preparation TIME NULL,
    r_nb_persons INT NULL,
    r_list_ingredients VARCHAR(255) NULL,
    r_category VARCHAR(50) NULL,
    r_photo_path VARCHAR(255) NULL,
    r_group_id INT NOT NULL,
    r_user_id INT NOT NULL,
    CONSTRAINT fk_recipe_group
        FOREIGN KEY (r_group_id)
        REFERENCES group_table(g_id),
    CONSTRAINT fk_recipe_user
        FOREIGN KEY (r_user_id)
        REFERENCES user(u_id)
);

--à checker
CREATE TABLE event (
     e_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
     e_title VARCHAR(50) NOT NULL,
     e_text VARCHAR(250) NULL,
     e_date_start TIMESTAMP NOT NULL,
     e_date_end TIMESTAMP NOT NULL,
     e_private BOOLEAN NOT NULL,
     e_user_id INT NOT NULL,
     e_group_id INT NOT NULL,
        CONSTRAINT fk_event_user
            FOREIGN KEY (e_user_id)
            REFERENCES user(u_id),
        CONSTRAINT fk_event_group
            FOREIGN KEY (e_group_id)
            REFERENCES group_table(g_id)
);

--à checker
CREATE TABLE remind_event (
    re_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    re_time TIMESTAMP NULL,
    re_message VARCHAR(255) NULL,
    re_event_id INT NOT NULL,
    re_user_id INT NOT NULL,
        CONSTRAINT fk_remind-event_event
            FOREIGN KEY (re_event_id)
            REFERENCES event(e_id),
        CONSTRAINT fk_remind-event_user
            FOREIGN KEY (re_user_id)
            REFERENCES user(u_id)
);

--à checker
CREATE TABLE category_contact {
  cc_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  cc_name VARCHAR(50) NOT NULL
}


CREATE TABLE contact (
  c_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  c_name VARCHAR(50) NOT NULL,
  c_email VARCHAR(50) NULL,
  c_phone VARCHAR(20) NULL,
  c_address (VARCHAR255) NULL,
  c_cat_contact_id VARCHAR(50) NULL,
  c_user_id INT NOT NULL,
  c_group_id INT NOT NULL,  
   CONSTRAINT fk_contact_cat-contact
        FOREIGN KEY (c_cat_contact_id)
        REFERENCES category_contact(cc_id),
   CONSTRAINT fk_contact_user
        FOREIGN KEY (c_user_id)
        REFERENCES user(u_id),
   CONSTRAINT fk_contact_group
        FOREIGN KEY (c_group_id)
        REFERENCES group_table(g_id)
);

