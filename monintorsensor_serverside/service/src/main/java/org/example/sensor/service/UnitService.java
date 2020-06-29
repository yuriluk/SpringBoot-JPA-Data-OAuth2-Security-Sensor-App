package org.example.sensor.service;

import org.example.sensor.service.dto.UnitDto;

import java.util.List;

public interface UnitService extends CrudService<UnitDto> {
    List<UnitDto> findAll();
}