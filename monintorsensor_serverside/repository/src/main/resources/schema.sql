-- Database: sensorMonitor
-- DROP DATABASE "sensorMonitor";

create DATABASE "sensorMonitor"
    with
    OWNER = postgres
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
------------------------------------------

-- Table: sensors
-- DROP TABLE sensors;
--------------------------------------------
create TABLE IF NOT EXISTS sensors
(
    id               BIGSERIAL PRIMARY KEY NOT NULL,
    name             VARCHAR(30)           NOT NULL,
    model            VARCHAR(15)           NOT NULL,
    range_from        BIGINT                       ,
    range_to          BIGINT                       ,
    location         VARCHAR(40)                   ,
    description      VARCHAR(200)
);
--------------------------------------------

create table if not exists locations
(
    id BIGSERIAL NOT NULL
        constraint locations_pkey
            PRIMARY KEY,
    name VARCHAR(40)
        constraint uk_locations
            UNIQUE
);


-- Table: types
-- DROP TABLE types;
--------------------------------------------
create TABLE IF NOT EXISTS types
(
    id      BIGSERIAL PRIMARY KEY NOT NULL,
    name    VARCHAR(64)  UNIQUE   NOT NULL
);
--------------------------------------------

-- Table: units
-- DROP TABLE units;
-------------------------------------------------
create TABLE IF NOT EXISTS units
(
    id   BIGSERIAL PRIMARY KEY NOT NULL
        constraint units_pkey,
    name VARCHAR(32) UNIQUE    NOT NULL
        constraint uk_units
);
---------------------------------------------


-- Table: "users"
-- DROP TABLE "users";
----------------------------------------------
create TABLE IF NOT EXISTS users
(
    id         BIGSERIAL PRIMARY KEY NOT NULL,
    name       VARCHAR(20)           NOT NULL,
    login      VARCHAR(30) UNIQUE    NOT NULL,
    password   VARCHAR(64),
    image_url   VARCHAR(1024),
    last_visit TIMESTAMP,
    provider   VARCHAR(30)
);
-------------------------------------------------

-- Table: roles
-- DROP TABLE roles;
-------------------------------------------------
create TABLE IF NOT EXISTS roles
(
    id          BIGSERIAL PRIMARY KEY NOT NULL,
    name        VARCHAR(30) UNIQUE    NOT NULL
);
-------------------------------------------------

create UNIQUE INDEX IF NOT EXISTS roles_name_uindex
    ON roles (name);


-- Table: sensor_types
-- DROP TABLE sensor_types;
------------------------------------------
create TABLE IF NOT EXISTS sensor_types
(
    sensor_id   bigint NOT NULL
        REFERENCES sensors (id) MATCH SIMPLE
            ON update CASCADE ON delete CASCADE,
    type_id     bigint NOT NULL
        REFERENCES types (id) MATCH SIMPLE
            ON update CASCADE ON delete CASCADE
);
--------------------------------------------

-- Table: type_units
--DROP TABLE type_units;
--------------------------------------------
create TABLE IF NOT EXISTS type_units
(
    unit_id bigint NOT NULL
        REFERENCES units (id) MATCH SIMPLE
            ON update CASCADE ON delete CASCADE,
    type_id  bigint NOT NULL
        REFERENCES types (id) MATCH SIMPLE
            ON update CASCADE ON delete CASCADE
);
-------------------------------------------------

-- Table: users_roles
-- DROP TABLE users_roles;
-------------------------------------------------
create TABLE IF NOT EXISTS users_roles
(
    role_id BIGINT NOT NULL
        REFERENCES roles (id) MATCH SIMPLE
            ON update CASCADE ON delete NO ACTION,
    user_id BIGINT NOT NULL
        REFERENCES users (id) MATCH SIMPLE
            ON update CASCADE ON delete CASCADE
);
-------------------------------------------------