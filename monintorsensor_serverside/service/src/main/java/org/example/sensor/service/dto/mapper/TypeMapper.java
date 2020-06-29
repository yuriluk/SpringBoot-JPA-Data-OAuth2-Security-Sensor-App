package org.example.sensor.service.dto.mapper;

import org.example.sensor.model.Type;
import org.example.sensor.service.dto.TypeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TypeMapper extends AbstractMapper<Type, TypeDto> {

    @Autowired
    public TypeMapper() {
        super(Type.class, TypeDto.class);
    }

}

