package org.example.sensor.service;

import org.example.sensor.service.dto.PageWrapper;
import org.example.sensor.service.dto.Paging;
import org.example.sensor.service.dto.SensorDto;

public interface SensorService extends CrudService<SensorDto>
{
    PageWrapper<SensorDto> findAllBySearchString(Paging paging, String searchString);
}