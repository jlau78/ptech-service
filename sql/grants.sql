
--// Run the following mysql scripts to allow the root user to connect from any IP address
--// Otherwise when you connect from the host dbClient you will get the error: Host 'xxx.xx.xxx.xxx' is not allowed to connect to this MySQL server
--// [Host 'xxx.xx.xxx.xxx' is not allowed to connect to this MySQL server](https://stackoverflow.com/questions/1559955/host-xxx-xx-xxx-xxx-is-not-allowed-to-connect-to-this-mysql-server)

CREATE USER 'root'@'%' IDENTIFIED BY 'passw0rd';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
