
create database ptech;

create role root with login password 'password';
alter user root with password 'passw0rd';
alter role root createdb;

