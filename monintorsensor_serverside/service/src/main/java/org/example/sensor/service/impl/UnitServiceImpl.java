package org.example.sensor.service.impl;

import org.example.sensor.model.Unit;
import org.example.sensor.repository.UnitRepository;
import org.example.sensor.service.UnitService;
import org.example.sensor.service.dto.Paging;
import org.example.sensor.service.dto.UnitDto;
import org.example.sensor.service.dto.mapper.UnitMapper;
import org.example.sensor.service.exception.ResourceNotFoundException;
import org.example.sensor.service.exception.ServiceException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
public class UnitServiceImpl implements UnitService {


    private final UnitRepository unitRepository;
    private final UnitMapper unitMapper;


    public UnitServiceImpl(UnitRepository unitRepository, UnitMapper unitMapper) {
        this.unitRepository = unitRepository;
        this.unitMapper = unitMapper;
    }

    @Transactional
    @Override
    public UnitDto save(UnitDto unitDto) {

        unitRepository.findByName(unitDto.getName())
                .ifPresent(value -> {
                    throw new ServiceException("Sorry, but unit with name=" + value.getName() + " is already present! Just modify previous version.");
                });

        return unitMapper.toDto(unitRepository.save(unitMapper.toEntity(unitDto)));
    }

    @Transactional
    @Override
    public UnitDto update(UnitDto unitDto) {
        Unit unit = unitRepository.findById(unitDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException(unitDto.getId()));

        unit.setName(unitDto.getName());

        return unitMapper.toDto(unitRepository.save(unit));
    }

    @Transactional
    @Override
    public void delete(Long id) {
        Unit unit = unitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));

        unitRepository.delete(unit);
    }

    @Override
    public UnitDto findById(Long id) {
        Unit unit = unitRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        return unitMapper.toDto(unit);
    }

    @Override
    public List<UnitDto> findAll(Paging paging) {
        return findAll();
    }

    @Override
    public List<UnitDto> findAll() {
        return unitMapper.toDtoList(unitRepository.findAll());
    }
}