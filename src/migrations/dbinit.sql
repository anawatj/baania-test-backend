CREATE TABLE houses (
    id SERIAL  PRIMARY KEY ,
    house_name text  NOT NULL ,
    house_desc text  NULL ,
    price  float NOT NULL ,
    post_code VARCHAR(20) NOT NULL

);

CREATE TABLE post_codes (
     id SERIAL  PRIMARY KEY ,
     post_code VARCHAR(20) NOT NULL
);
INSERT INTO post_codes (
    post_code
)VALUES(
    '10200'
);

INSERT INTO post_codes (
    post_code
)VALUES(
    '10500'
);