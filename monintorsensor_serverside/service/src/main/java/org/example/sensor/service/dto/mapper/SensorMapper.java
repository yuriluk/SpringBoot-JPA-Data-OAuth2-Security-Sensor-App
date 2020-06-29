package org.example.sensor.service.dto.mapper;

import org.example.sensor.model.Sensor;
import org.example.sensor.service.dto.SensorDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SensorMapper extends AbstractMapper<Sensor, SensorDto> {

    @Autowired
    public SensorMapper() {
        super(Sensor.class, SensorDto.class);
    }

}

