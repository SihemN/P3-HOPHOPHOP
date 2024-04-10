
create table item (
    id int unsigned primary key auto_increment not null,
    title varchar(255) not null
);


CREATE TABLE user (
    u_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    u_name VARCHAR(20) NOT NULL,
    u_email VARCHAR(50) UNIQUE,
    u_hashedPassword VARCHAR(255) NOT NULL,
    u_avatar VARCHAR(500) NULL,
    u_active BOOLEAN NOT NULL DEFAULT true 
);

CREATE TABLE group_table (
    g_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    g_name VARCHAR(30) NOT NULL
);

CREATE TABLE user_group (
    ug_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    ug_user_id INT NOT NULL,
    ug_user_role ENUM ('admin', 'membre') NOT NULL,
    ug_group_id INT NOT NULL,
    ug_message TEXT NULL,
        CONSTRAINT fk_user_group_user
            FOREIGN KEY (ug_user_id)
            REFERENCES user(u_id)
            ON DELETE CASCADE,
        CONSTRAINT fk_user_group_group
            FOREIGN KEY (ug_group_id)
            REFERENCES group_table(g_id)
            ON DELETE CASCADE    
);

CREATE TABLE category_document (
    cd_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cd_name VARCHAR(50) NOT NULL,
    cd_group_id INT NOT NULL,
        CONSTRAINT fk_cat_document_group
            FOREIGN KEY (cd_group_id)
            REFERENCES group_table(g_id)
            ON DELETE CASCADE
);

CREATE TABLE document (
    d_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    d_name VARCHAR(50) NOT NULL,
    d_path VARCHAR(255) NOT NULL,
    d_private BOOLEAN NOT NULL DEFAULT true,
    d_category_document_id INT NOT NULL,
    d_user_id INT NOT NULL,
    d_group_id INT NOT NULL,
        CONSTRAINT fk_document_category
            FOREIGN KEY (d_category_document_id)
            REFERENCES category_document(cd_id)
            ON DELETE CASCADE,
        CONSTRAINT fk_document_user
            FOREIGN KEY (d_user_id)
            REFERENCES user(u_id)
            ON DELETE CASCADE,
        CONSTRAINT fk_document_group
            FOREIGN KEY (d_group_id)
            REFERENCES group_table(g_id)
            ON DELETE CASCADE
);

CREATE TABLE category_transaction (
    ctra_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    ctra_name VARCHAR(50) NOT NULL,
    ctra_active BOOLEAN NOT NULL DEFAULT true,
    ctra_group_id INT NOT NULL,  
        CONSTRAINT fk_cat_transaction_group
            FOREIGN KEY (ctra_group_id)
            REFERENCES group_table(g_id)
            ON DELETE CASCADE
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
        CONSTRAINT fk_transaction_category_trans
            FOREIGN KEY (tr_cat_transaction_id)
            REFERENCES category_transaction(ctra_id),
        CONSTRAINT fk_transaction_group
            FOREIGN KEY (tr_group_id)
            REFERENCES group_table(g_id)
            ON DELETE CASCADE,
        CONSTRAINT fk_transaction_user
            FOREIGN KEY (tr_user_id)
            REFERENCES user(u_id)
);

-- category = une to do list
CREATE TABLE category_task (
    cta_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cta_name VARCHAR(50) NOT NULL,
    cta_private BOOLEAN NOT NULL DEFAULT false,
    cta_user_id INT NOT NULL,
    cta_group_id INT NOT NULL,
        CONSTRAINT fk_cat_task_user
            FOREIGN KEY (cta_user_id)
            REFERENCES user(u_id),
        CONSTRAINT fk_cat_task_group
            FOREIGN KEY (cta_group_id)
            REFERENCES group_table(g_id)
            ON DELETE CASCADE
);

CREATE TABLE task (
    ta_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    ta_name VARCHAR(50) NOT NULL,
    ta_done BOOLEAN NOT NULL,
    ta_cat_task_id INT NOT NULL,
    ta_user_id INT NOT NULL,
    ta_group_id INT NOT NULL,
        CONSTRAINT fk_task_category_task
            FOREIGN KEY (ta_cat_task_id)
            REFERENCES category_task(cta_id)
            ON DELETE CASCADE,
        CONSTRAINT fk_task_user
            FOREIGN KEY (ta_user_id)
            REFERENCES user(u_id),
        CONSTRAINT fk_task_group
            FOREIGN KEY (ta_group_id)
            REFERENCES group_table(g_id)
            ON DELETE CASCADE
);

-- si on a le temps - fonctionnalité bonus
CREATE TABLE position_table (
    pos_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    pos_longitude DECIMAL(10, 5) NOT NULL,
    pos_latitude DECIMAL(10, 5) NOT NULL,
    pos_name VARCHAR(255)NOT NULL
);

CREATE TABLE position_user (
    pu_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    pu_user_id INT NOT NULL,
    pu_position_id INT NOT NULL,
        CONSTRAINT fk_position_user_user
            FOREIGN KEY (pu_user_id)
            REFERENCES user(u_id),
        CONSTRAINT fk_position_user_position
            FOREIGN KEY (pu_position_id)
            REFERENCES position_table(pos_id)
);
-- ////////////////////////////////////////

CREATE TABLE recipe (
    r_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    r_name VARCHAR(50) NOT NULL,
    r_description TEXT NULL,
    r_time_preparation VARCHAR(20) NULL,
    r_nb_persons INT NULL,
    r_list_ingredients VARCHAR(255) NULL,
    r_category VARCHAR(50) NULL,
    r_photo_path VARCHAR(255) NULL,
    r_group_id INT NOT NULL,
    r_user_id INT NOT NULL,
        CONSTRAINT fk_recipe_group
            FOREIGN KEY (r_group_id)
            REFERENCES group_table(g_id)
            ON DELETE CASCADE,
        CONSTRAINT fk_recipe_user
            FOREIGN KEY (r_user_id)
            REFERENCES user(u_id)
);


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
            ON DELETE CASCADE
);


CREATE TABLE remind_event (
    re_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    re_time TIMESTAMP NULL,
    re_message VARCHAR(255) NULL,
    re_event_id INT NOT NULL,
    re_user_id INT NOT NULL,
        CONSTRAINT fk_remind_event_event
            FOREIGN KEY (re_event_id)
            REFERENCES event(e_id)
            ON DELETE CASCADE,
        CONSTRAINT fk_remind_event_user
            FOREIGN KEY (re_user_id)
            REFERENCES user(u_id)
);


CREATE TABLE category_contact (
    cc_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cc_name VARCHAR(50) NOT NULL,
    cc_group_id INT NOT NULL, 
        CONSTRAINT fk_cat_contact_group
            FOREIGN KEY (cc_group_id)
            REFERENCES group_table(g_id)
            ON DELETE CASCADE
);


CREATE TABLE contact (
    c_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    c_name VARCHAR(50) NOT NULL,
    c_email VARCHAR(50) NULL,
    c_phone VARCHAR(20) NULL,
    c_address VARCHAR(255) NULL,
    c_cat_contact_id INT NOT NULL,
    c_user_id INT NOT NULL,
    c_group_id INT NOT NULL,  
        CONSTRAINT fk_contact_cat_contact
            FOREIGN KEY (c_cat_contact_id)
            REFERENCES category_contact(cc_id)
            ON DELETE CASCADE,
        CONSTRAINT fk_contact_user
            FOREIGN KEY (c_user_id)
            REFERENCES user(u_id),
        CONSTRAINT fk_contact_group
            FOREIGN KEY (c_group_id)
            REFERENCES group_table(g_id)
            ON DELETE CASCADE
);
