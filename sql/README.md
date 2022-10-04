# Create the `ptech` postgres database and tables

cd to this directory

Connect to the postgres DB
`psql -h yogatop -p 5432 -U postgres`

Run the sql file to create the ptech DB
`\i 01_pgstart.sql`

Connect to the new ptech DB
`\c ptech`

Run the sql to create the tables
`\i 02_createCatalog.postgres.sql`

Run the sql to insert data
`\i 03_insert_products.postgres.sql`


## Connect to the ptech DB from the command line

psql -h yogatop -p 5432 -U root -d ptech


