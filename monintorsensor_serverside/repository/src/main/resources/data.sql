INSERT INTO roles(name) VALUES('Viewer');
INSERT INTO roles(name) VALUES('Administrator');

INSERT INTO types(name) VALUES('Pressure');
INSERT INTO types(name) VALUES('Voltage');
INSERT INTO types(name) VALUES('Temperature');
INSERT INTO types(name) VALUES('Humidity');

INSERT INTO units(name) VALUES('bar');
INSERT INTO units(name) VALUES('voltage');
INSERT INTO units(name) VALUES('°С');
INSERT INTO units(name) VALUES('%');


INSERT INTO  type_units(unit_id, type_id) VALUES(1,1);
INSERT INTO  type_units(unit_id, type_id) VALUES(2,2);
INSERT INTO  type_units(unit_id, type_id) VALUES(3,3);
INSERT INTO  type_units(unit_id, type_id) VALUES(4,4);


insert into public.sensors(description, location_id, model, name, range_from, range_to)
values('first sensor', 1, ' FIRST', 'my sensor', -10, 20);

INSERT INTO  sensor_types(sensor_id, type_id) VALUES(1,1);