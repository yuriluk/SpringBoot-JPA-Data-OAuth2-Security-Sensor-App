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
create TABLE IF NOT EXISTS public.sensors
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


-- Table: types
-- DROP TABLE types;
--------------------------------------------
create TABLE IF NOT EXISTS public.types
(
    id      BIGSERIAL PRIMARY KEY NOT NULL,
    name    VARCHAR(64)  UNIQUE   NOT NULL
);
--------------------------------------------

-- Table: units
-- DROP TABLE units;
-------------------------------------------------
create TABLE IF NOT EXISTS public.units
(
    id   BIGSERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(32) UNIQUE    NOT NULL
);
---------------------------------------------

-- Table: "users"
-- DROP TABLE "users";
----------------------------------------------
create TABLE IF NOT EXISTS public.users
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
create TABLE IF NOT EXISTS public.roles
(
    id          BIGSERIAL PRIMARY KEY NOT NULL,
    name        VARCHAR(30) UNIQUE    NOT NULL
);
-------------------------------------------------

create UNIQUE INDEX IF NOT EXISTS roles_name_uindex
    ON public.roles (name);


-- Table: sensor_types
-- DROP TABLE sensor_types;
------------------------------------------
create TABLE IF NOT EXISTS public.sensor_types
(
    sensor_id   bigint NOT NULL
        REFERENCES public.sensors (id) MATCH SIMPLE
            ON update CASCADE ON delete CASCADE,
    type_id     bigint NOT NULL
        REFERENCES public.types (id) MATCH SIMPLE
            ON update CASCADE ON delete CASCADE
);
--------------------------------------------

-- Table: type_units
--DROP TABLE type_units;
--------------------------------------------
create TABLE IF NOT EXISTS public.type_units
(
    unit_id bigint NOT NULL
        REFERENCES public.units (id) MATCH SIMPLE
            ON update CASCADE ON delete CASCADE,
    type_id  bigint NOT NULL
        REFERENCES public.types (id) MATCH SIMPLE
            ON update CASCADE ON delete CASCADE
);
-------------------------------------------------

-- Table: users_roles
-- DROP TABLE users_roles;
-------------------------------------------------
create TABLE IF NOT EXISTS public.users_roles
(
    role_id BIGINT NOT NULL
        REFERENCES public.roles (id) MATCH SIMPLE
            ON update CASCADE ON delete NO ACTION,
    user_id BIGINT NOT NULL
        REFERENCES public.users (id) MATCH SIMPLE
            ON update CASCADE ON delete CASCADE
);
-------------------------------------------------