-- Database: sensorMonitor
-- DROP DATABASE "sensorMonitor";
--
-- create DATABASE "sensorMonitor"
--     with
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1;
-- ------------------------------------------

-- Table: sensors
-- DROP TABLE sensors;
--------------------------------------------
create TABLE IF NOT EXISTS sensors
(
    id               BIGSERIAL             NOT NULL
                constraint sensors_pkey PRIMARY KEY,
    name             VARCHAR(30)           NOT NULL,
    model            VARCHAR(15)           NOT NULL,
    range_from        BIGINT                       ,
    range_to          BIGINT                       ,
    location_id      BIGINT
                constraint fk_locations
                REFERENCES locations                ,
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

create table if not exists locations_sensors
(
    location_id bigint not null
        constraint fk_locations_sensors_locations
            REFERENCES locations,
    sensors_id bigint not null
        constraint uk_sensors
            UNIQUE
        constraint fk_location_sensors_sensors
            REFERENCES sensors
);

-- Table: types
-- DROP TABLE types;
--------------------------------------------
create TABLE IF NOT EXISTS types
(
    id      BIGSERIAL PRIMARY KEY NOT NULL
                    constraint types_pkey,
    name    VARCHAR(64)            NOT NULL
                constraint uk_types  UNIQUE
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
    id         BIGSERIAL  NOT NULL
                constraint users_pkey
                                  PRIMARY KEY,
    name       VARCHAR(20)           NOT NULL,
    login      VARCHAR(30)           NOT NULL
                    constraint uk_login
                                        UNIQUE,
    password   VARCHAR(64),
    image_url   VARCHAR(1024),
    last_visit TIMESTAMP              NOT NULL,
    provider   VARCHAR(255)           NOT NULL
);
-------------------------------------------------

-- Table: roles
-- DROP TABLE roles;
-------------------------------------------------
create TABLE IF NOT EXISTS roles
(
    id          BIGSERIAL PRIMARY KEY NOT NULL
            constraint roles_pkey,
    name        VARCHAR(30) UNIQUE    NOT NULL
            constraint uk_roles
                    unique
);
-------------------------------------------------

create UNIQUE INDEX IF NOT EXISTS roles_name_uindex
    ON roles (name);


-- Table: sensor_types
-- DROP TABLE sensor_types;
------------------------------------------
create TABLE IF NOT EXISTS sensor_types
(
    sensor_id   BIGINT NOT NULL
     constraint sensor_types_pkey
            PRIMARY KEY
    constraint fk_sensors
        REFERENCES sensors
            ON update CASCADE ON delete CASCADE,
    type_id     BIGINT NOT NULL
         constraint fk_types REFERENCES types
            ON update CASCADE ON delete CASCADE
);
--------------------------------------------

-- Table: type_units
--DROP TABLE type_units;
--------------------------------------------
create TABLE IF NOT EXISTS type_units
(
    unit_id BIGINT NOT NULL
        constraint fk_type_units_units
                    REFERENCES units,
            constraint type_units_pkey
                 PRIMARY KEY (type_id, unit_id)
            ON update CASCADE ON delete CASCADE,
    type_id  BIGINT NOT NULL
      constraint fk_type_units_types
        REFERENCES types
            ON update CASCADE ON delete CASCADE
);
-------------------------------------------------

-- Table: users_roles
-- DROP TABLE users_roles;
-------------------------------------------------
create TABLE IF NOT EXISTS users_roles
(
    role_id BIGINT NOT NULL
        constraint fk_roles
        REFERENCES roles
            ON update CASCADE ON delete NO ACTION,
    user_id BIGINT NOT NULL
            constraint fk_users
            REFERENCES users
            ON update CASCADE ON delete CASCADE
);
-------------------------------------------------