-- some commands
/* 
to show the port the postgres is running on
    1. open the terminal
    2. type psql -U postgres -d postgres
    3. type the password 
-- SHOW PORT;

-- to show the databases
-- \l
-- to nav to a database
-- \c database_name
-- to show the tables in a database
-- \dt
-- to show the columns in a table
-- \d table_name
-- to show the data in a table
-- SELECT * FROM table_name;
-- to exit the terminal
-- \q
-- to create a database
-- CREATE DATABASE database_name;
-- to create a table
-- CREATE TABLE table_name(
--     column_name data_type,
--     column_name data_type
-- );
-- to delete a database
-- DROP DATABASE database_name;
-- to delete a table
-- DROP TABLE table_name;
-- to insert data into a table
-- INSERT INTO table_name(column1, column2) VALUES(value1, value2);
-- to update data in a table
-- UPDATE table_name SET column1 = value1 WHERE condition;
-- to delete data from a table
-- DELETE FROM table_name WHERE condition;
-- to delete all data from a table
-- DELETE FROM table_name;
-- to delete a column from a table
-- ALTER TABLE table_name DROP COLUMN column_name;



 */

CREATE DATABASE PERN;
CREATE TABLE todo(
    t_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);