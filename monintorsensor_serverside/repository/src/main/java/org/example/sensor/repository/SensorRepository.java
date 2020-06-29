package org.example.sensor.repository;

import org.example.sensor.model.Location;
import org.example.sensor.model.Sensor;
import org.example.sensor.model.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SensorRepository extends JpaRepository<Sensor, Long>, JpaSpecificationExecutor<Sensor> {

    Optional<Sensor> findByName(String name);

    Optional<Sensor> findByModel(String model);

    Optional<Sensor> findByType(Type type);

    Optional<Sensor> findByLocation(Location location);

    Optional<Sensor> findByDescription(String description);
}