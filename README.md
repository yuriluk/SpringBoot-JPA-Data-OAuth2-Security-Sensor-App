# Restful service
Sensor Management restful application with UI on react
using antd and building with webpack. 
SpringBoot-WEB-MVC-JPA Data-OAuth2 Security(3 providers)-REST API-CRUD project.
Localization for two languages(English and Russian)
and building with Maven as multi-modules project.

Perform the following operations:
CRUD operations for Sensors.

Tools used:
Spring Boot.
JDK version: 8. Streams.
Database connection pool: HikariCP.
Spring JPA Data.
Build tool: Apache Maven 3.6+. Multi-module project.
Web server: Apache Tomcat.
Application container: Spring IoC. Spring Framework.
Spring configured via Java config.
Database: PostgresSQL 9.+ or 10.+

Security:
Stateless user authentication and verify integrity of JWT token.
OAuth2 as an authorization protocol.
OAuth2 scope used to restrict data.
Implement CSRF protection.
Implement self Signed Certificate protection.

Register
click on Register then enter your information.


You could use your social accounts(facebook, google, github) to login this app.
Choose appropriate icon and login.

Search
search it can be done by sensor name,model, location or description.

Logout
click on logout button.

Edit Sensors
click on edit button and change whatever your want.


Add sensor page
All fields are required except location and description.

Delete Sensor
click on Delete button, system require confirmation for this action.
It is possible to delete sensors only for users with administrator privileges.


# How to run?

Client app: 
You need to run npm install, then npm run start. 

Server app: 
First of all you need:
1) Create db named sensorMonitor.
2) Start app to create db schema. You need to run Application.java
3) Insert two roles using db admin console or whatever you want:
INSERT INTO roles(name) VALUES('Viewer');
INSERT INTO roles(name) VALUES('Administrator');

Administrator role could be assigned through db tools.
Viewer role will be assigned to any registered user.

4) Don`t forget to change db data (application.properties at dataacess)
5) Insert correct provider related secret keys (application.yml in service module)
