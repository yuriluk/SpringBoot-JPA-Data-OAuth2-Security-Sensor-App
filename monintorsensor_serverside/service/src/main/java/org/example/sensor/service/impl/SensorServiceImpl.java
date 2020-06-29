package org.example.sensor.service.impl;

import org.example.sensor.model.Location;
import org.example.sensor.model.Sensor;
import org.example.sensor.model.Type;
import org.example.sensor.model.Unit;
import org.example.sensor.repository.LocationRepository;
import org.example.sensor.repository.SensorRepository;
import org.example.sensor.repository.TypeRepository;
import org.example.sensor.repository.UnitRepository;
import org.example.sensor.service.SensorService;
import org.example.sensor.service.dto.PageWrapper;
import org.example.sensor.service.dto.Paging;
import org.example.sensor.service.dto.SensorDto;
import org.example.sensor.service.dto.mapper.SensorMapper;
import org.example.sensor.service.exception.ResourceNotFoundException;
import org.example.sensor.service.exception.ServiceException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import static org.example.sensor.repository.specification.SensorSpecification.*;

@Service
public class SensorServiceImpl implements SensorService {

    private final SensorRepository sensorRepository;
    private final SensorMapper sensorMapper;
    private final TypeRepository typeRepository;
    private final UnitRepository unitRepository;
    private final LocationRepository locationRepository;


    public SensorServiceImpl(SensorRepository sensorRepository, SensorMapper sensorMapper, TypeRepository typeRepository, UnitRepository unitRepository, LocationRepository locationRepository) {
        this.sensorRepository = sensorRepository;
        this.sensorMapper = sensorMapper;
        this.typeRepository = typeRepository;
        this.unitRepository = unitRepository;
        this.locationRepository = locationRepository;
    }

    @Transactional
    @Override
    public SensorDto save(SensorDto sensorDto) {

        sensorRepository.findByName(sensorDto.getName())
                .ifPresent(value -> {
                    throw new ServiceException("Sorry, but sensor with name=" + value.getName() + " is already present! Just modify previous version.");
                });

        Type type = typeRepository.getOne(sensorDto.getType().getId());
        Unit unit = unitRepository.getOne(sensorDto.getType().getId());
        type.getUnits().add(unit);

        Sensor sensor = sensorMapper.toEntity(sensorDto);
        sensor.setType(type);

        sensor.setLocation(resolveLocation(sensor));
        return sensorMapper.toDto(sensorRepository.save(sensor));
    }

    @Transactional
    @Override
    public SensorDto update(SensorDto sensorDto) {
        Sensor sensorFromDb = sensorRepository.findById(sensorDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException(sensorDto.getId()));

        Sensor sensorForUpdate = sensorMapper.toEntity(sensorDto);


        Type type = typeRepository.getOne(sensorDto.getType().getId());
        type.setUnits(resolveUnits(sensorDto));

        sensorForUpdate.setType(type);
        sensorForUpdate.setLocation(resolveLocation(sensorForUpdate));

        return sensorMapper.toDto(sensorRepository.save(sensorForUpdate));
    }


    @Transactional
    @Override
    public void delete(Long id) {
        Sensor sensor = sensorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));

        sensorRepository.delete(sensor);
    }

    @Override
    public SensorDto findById(Long id) {
        Sensor sensor = sensorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        return sensorMapper.toDto(sensor);
    }

    @Override
    public List<SensorDto> findAll(Paging paging) {
        return sensorMapper.toDtoList(sensorRepository.findAll());
    }


    @Override
    public PageWrapper<SensorDto> findAllBySearchString(Paging paging, String searchString) {

        Pageable pageable = getPageable(paging);
        Specification<Sensor> specification = getSensorSpecification(searchString);
        Page<Sensor> page = sensorRepository.findAll(specification, pageable);

        List<Sensor> sensors = page.toList();
        return
                PageWrapper.of(
                        sensorMapper.toDtoList(sensors),
                        page.getTotalPages(),
                        page.getTotalElements(),
                        paging.getPage(),
                        page.getNumberOfElements());
    }


    private Location resolveLocation(Sensor sensor) {
        Location location = sensor.getLocation();
        if (isLocationExists(location)) {
            if (Objects.isNull(location.getId())) {
                location = getExistingLocationByNameOrAddAndReturn(location);
            } else {
                location = getExistingLocationByIdOrThrowException(location);
            }
        }
        return location;
    }

    private boolean isLocationExists(Location location) {
        return Objects.nonNull(location);
    }

    private Location getExistingLocationByNameOrAddAndReturn(Location location) {
        return locationRepository.findByName(location.getName())
                .orElseGet(() -> locationRepository.save(location));
    }


    private Location getExistingLocationByIdOrThrowException(Location location) {
        return locationRepository.findById(location.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Location with id=" + location.getId()
                        + " does not exist."));
    }


    private Set<Unit> resolveUnits(SensorDto sensorDto) {
        Set<Unit> units = new HashSet<>();
        sensorDto.getType().getUnits().forEach(unitDto -> {
            Unit findUnit = unitRepository.getOne(sensorDto.getType().getId());
            units.add(findUnit);
        });
        return units;
    }


    private Specification<Sensor> getSensorSpecification(String searchParam) {

        return Specification
                .where(findBySensorNameLike(searchParam))
                .or(findBySensorModelLike(searchParam))
                .or(findBySensorTypeLike(searchParam))
                .or(findBySensorLocationLike(searchParam))
                .or(findBySensorDescriptionLike(searchParam));
    }


    private Pageable getPageable(Paging paging) {
        return PageRequest.of(paging.getPage(), paging.getSize());
    }
}
