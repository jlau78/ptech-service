
CREATE TABLE IF NOT EXISTS CATALOG (

	ID INT AUTO_INCREMENT,
	NAME VARCHAR(30),
	DESCRIPTION VARCHAR(200),
	PRIMARY KEY (ID)
	
);

CREATE TABLE IF NOT EXISTS CATEGORY (

	ID INT AUTO_INCREMENT,
	NAME VARCHAR(30),
	DESCRIPTION VARCHAR(200),
	PRIMARY KEY (ID)
	
);



CREATE TABLE IF NOT EXISTS CS_CATEGORY
(
    ID INT AUTO_INCREMENT,
    NAME varchar(50),
    DESCRIPTION text,
    PRIMARY KEY (ID)
);


CREATE TABLE IF NOT EXISTS CS_PRODUCT
(
    ID INT AUTO_INCREMENT,
    NAME varchar(50),
    DESCRIPTION text,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS CS_CATEGORY_PRD
(
    CATEGORY_ID INT,
    SEQNUM INT,
    PRODUCT_ID INT NOT NULL,
    PRIMARY KEY (CATEGORY_ID, SEQNUM)
);

ALTER TABLE CS_CATEGORY_PRD 
MODIFY COLUMN PRODUCT_ID INT;

ALTER TABLE CS_CATEGORY_PRD 
MODIFY COLUMN CATEGORY_ID INT;

ALTER TABLE CS_CATEGORY_PRD 
ADD FOREIGN KEY (PRODUCT_ID) REFERENCES CS_PRODUCT(ID);

ALTER TABLE CS_CATEGORY_PRD 
ADD FOREIGN KEY (CATEGORY_ID) REFERENCES CS_CATEGORY(ID);


CREATE TABLE IF NOT EXISTS CS_ATTRIBUTE
(
    ID INT AUTO_INCREMENT,
    NAME varchar(50),
    DESCRIPTION text,
    VALUE TEXT,
    PRIMARY KEY (ID)
);


CREATE TABLE IF NOT EXISTS CS_PROD_ATTRIBUTE (
  PRODUCT_ID int ,
  SEQNUM int ,
  ATTRIBUTE_ID int ,
  PRIMARY KEY (PRODUCT_ID, SEQNUM)
);


CREATE TABLE IF NOT EXISTS CS_SKU
(
    ID INT AUTO_INCREMENT,
    NAME varchar(50),
    DESCRIPTION text,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS CS_SKU_ATTRIBUTE
(
    SKU_ID INT,
    SEQNUM INT,
    ATTRIBUTE_ID INT NOT NULL,
    PRIMARY KEY (SKU_ID, SEQNUM)
);

CREATE TABLE IF NOT EXISTS CS_PROD_SKU
(
    PRODUCT_ID INT,
    SEQNUM INT,
    SKU_ID INT NOT NULL,
    PRIMARY KEY (PRODUCT_ID, SEQNUM)
);

ALTER TABLE CS_SKU_ATTRIBUTE
ADD FOREIGN KEY (SKU_ID) REFERENCES CS_SKU(ID);

ALTER TABLE CS_SKU_ATTRIBUTE
ADD FOREIGN KEY (ATTRIBUTE_ID) REFERENCES CS_ATTRIBUTE(ID);


ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'passw0rd'

FLUSH PRIVILEGES;

-- show tables;