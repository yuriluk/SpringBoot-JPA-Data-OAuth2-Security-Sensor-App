package org.example.sensor.service.dto.mapper;


import org.example.sensor.model.AbstractEntity;
import org.example.sensor.service.dto.AbstractDto;

import java.util.List;

public interface Mapper<E extends AbstractEntity, D extends AbstractDto> {

    E toEntity(D d);

    D toDto(E e);

    List<D> toDtoList(List<E> eList);
}