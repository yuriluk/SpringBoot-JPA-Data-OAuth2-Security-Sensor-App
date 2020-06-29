package org.example.sensor.service;

import org.example.sensor.service.dto.TypeDto;

import java.util.List;

public interface TypeService extends CrudService<TypeDto> {
    List<TypeDto> findAll();
}