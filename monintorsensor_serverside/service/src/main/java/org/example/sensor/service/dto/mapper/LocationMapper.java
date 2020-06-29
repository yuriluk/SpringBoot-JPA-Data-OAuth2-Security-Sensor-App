package org.example.sensor.service.dto.mapper;

import org.example.sensor.model.Location;
import org.example.sensor.service.dto.LocationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LocationMapper extends AbstractMapper<Location, LocationDto> {

    @Autowired
    public LocationMapper() {
        super(Location.class, LocationDto.class);
    }

}

