package org.example.sensor.service.dto.mapper;

import org.example.sensor.model.Unit;
import org.example.sensor.service.dto.UnitDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UnitMapper extends AbstractMapper<Unit, UnitDto> {

    @Autowired
    public UnitMapper() {
        super(Unit.class, UnitDto.class);
    }

}

