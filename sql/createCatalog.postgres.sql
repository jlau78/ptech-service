
CREATE TABLE IF NOT EXISTS CATALOG (

	ID SERIAL PRIMARY KEY,
	NAME VARCHAR(30),
	DESCRIPTION VARCHAR(200)
);




CREATE TABLE IF NOT EXISTS CATALOG (

	ID SERIAL primary KEY,
	NAME VARCHAR(30),
	DESCRIPTION VARCHAR(200)
	
);




CREATE TABLE IF NOT EXISTS CS_CATEGORY
(
	ID SERIAL PRIMARY KEY,
    NAME varchar(50),
    DESCRIPTION text
);


CREATE TABLE IF NOT EXISTS CS_PRODUCT
(
	ID SERIAL PRIMARY KEY,
    NAME varchar(50),
    DESCRIPTION text,
    MEDIA INTEGER,
    LIST_MEDIA INTEGER,
    PRICE INTEGER
);

CREATE TABLE IF NOT EXISTS CS_CATEGORY_PRD
(
	CATEGORY_ID SERIAL PRIMARY KEY,
    SEQNUM INTEGER,
    PRODUCT_ID INTEGER NOT NULL
);

ALTER TABLE CS_CATEGORY_PRD 
ADD CONSTRAINT FK_CATPRD_PRDID FOREIGN KEY (PRODUCT_ID) REFERENCES CS_PRODUCT(ID);

ALTER TABLE CS_CATEGORY_PRD 
ADD CONSTRAINT FK_CATPRD_CATID FOREIGN KEY (CATEGORY_ID) REFERENCES CS_CATEGORY(ID);

CREATE TABLE IF NOT EXISTS CS_ATTRIBUTE
(
	ID SERIAL PRIMARY KEY,
    NAME varchar(50),
    DESCRIPTION text,
    VALUE TEXT
);

CREATE TABLE IF NOT EXISTS CS_PROD_ATTRIBUTE (
  PRODUCT_ID INTEGER,
  SEQNUM INTEGER,
  ATTRIBUTE_ID INTEGER ,
  PRIMARY KEY (PRODUCT_ID, SEQNUM)
);

CREATE TABLE IF NOT EXISTS CS_SKU
(
	ID SERIAL PRIMARY KEY,
    NAME varchar(50),
    DESCRIPTION text
);

CREATE TABLE IF NOT EXISTS CS_SKU_ATTRIBUTE
(
    SKU_ID INTEGER,
    SEQNUM INTEGER,
    ATTRIBUTE_ID INTEGER NOT NULL,
    PRIMARY KEY (SKU_ID, SEQNUM)
);

CREATE TABLE IF NOT EXISTS CS_PROD_SKU
(
    PRODUCT_ID INTEGER,
    SEQNUM INTEGER,
    SKU_ID INTEGER NOT NULL,
    PRIMARY KEY (PRODUCT_ID, SEQNUM)
);

ALTER TABLE CS_SKU_ATTRIBUTE
ADD CONSTRAINT FK_SKU_ATTR_SKUID FOREIGN KEY (SKU_ID) REFERENCES CS_SKU(ID);

ALTER TABLE CS_SKU_ATTRIBUTE
ADD CONSTRAINT FK_SKU_ATTR_ATTRID FOREIGN KEY (ATTRIBUTE_ID) REFERENCES CS_ATTRIBUTE(ID);


CREATE TABLE IF NOT EXISTS MEDIA
(
	ID INTEGER, NAME VARCHAR(50),
	TYPE INTEGER,
	PATH VARCHAR(255),
	PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS PRICE_INFO
(
	ID INTEGER,
	REF VARCHAR(255),
	PRICE DECIMAL(9,2),
	TAX DECIMAL(9,2),
	PRIMARY KEY (ID)
);

ALTER TABLE CS_PRODUCT 
ADD CONSTRAINT FK_PRD_MEDIAID FOREIGN KEY (LIST_MEDIA) REFERENCES MEDIA(ID);

