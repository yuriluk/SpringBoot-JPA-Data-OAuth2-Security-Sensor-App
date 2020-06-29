package org.example.sensor.service.impl;

import org.example.sensor.model.Type;
import org.example.sensor.model.Unit;
import org.example.sensor.repository.TypeRepository;
import org.example.sensor.repository.UnitRepository;
import org.example.sensor.service.TypeService;
import org.example.sensor.service.dto.Paging;
import org.example.sensor.service.dto.TypeDto;
import org.example.sensor.service.dto.mapper.TypeMapper;
import org.example.sensor.service.dto.mapper.UnitMapper;
import org.example.sensor.service.exception.ResourceNotFoundException;
import org.example.sensor.service.exception.ServiceException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class TypeServiceImpl implements TypeService {


    private final TypeRepository typeRepository;
    private final UnitRepository unitRepository;
    private final TypeMapper typeMapper;


    public TypeServiceImpl(TypeRepository typeRepository, TypeMapper typeMapper, UnitRepository unitRepository, UnitMapper unitMapper) {
        this.typeRepository = typeRepository;
        this.unitRepository = unitRepository;
        this.typeMapper = typeMapper;
    }

    @Transactional
    @Override
    public TypeDto save(TypeDto typeDto) {

        typeRepository.findByName(typeDto.getName())
                .ifPresent(value -> {
                    throw new ServiceException("Sorry, but type with name=" + value.getName() + " is already present! Just modify previous version.");
                });

        Type type = typeMapper.toEntity(typeDto);
        type.setUnits(resolveUnits(type));

        return typeMapper.toDto(typeRepository.save(type));
    }


    @Transactional
    @Override
    public TypeDto update(TypeDto typeDto) {
        Type prevType = typeRepository.findById(typeDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException(typeDto.getId()));
        Type typeForUpdate = typeMapper.toEntity(typeDto);

        typeForUpdate.setUnits(resolveUnits(typeForUpdate));

        return typeMapper.toDto(typeRepository.save(typeForUpdate));
    }


    @Transactional
    @Override
    public void delete(Long id) {
        Type type = typeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        typeRepository.delete(type);
    }

    @Override
    public TypeDto findById(Long id) {
        Type type = typeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        return typeMapper.toDto(type);
    }

    @Override
    public List<TypeDto> findAll(Paging paging) {
        return findAll();
    }

    @Override
    public List<TypeDto> findAll() {
        return typeMapper.toDtoList(typeRepository.findAll());
    }


    private Set<Unit> resolveUnits(Type type) {
        return
                type.getUnits()
                        .stream()
                        .map(unit -> Objects.isNull(unit.getId()) ?
                                getExistingUnitByNameOrAddAndReturn(unit) :
                                getExistingUnitByIdOrThrowException(unit)
                        ).collect(Collectors.toSet());
    }

    private Unit getExistingUnitByNameOrAddAndReturn(Unit unit) {
        return unitRepository.findByName(unit.getName())
                .orElseGet(() -> unitRepository.save(unit));
    }

    private Unit getExistingUnitByIdOrThrowException(Unit unit) {
        return unitRepository.findById(unit.getId())
                .orElseThrow(() -> new ResourceNotFoundException(unit.getId()));
    }
}