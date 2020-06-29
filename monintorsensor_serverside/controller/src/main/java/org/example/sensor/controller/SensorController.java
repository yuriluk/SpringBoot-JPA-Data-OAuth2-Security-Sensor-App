package org.example.sensor.controller;

import org.example.sensor.service.SensorService;
import org.example.sensor.service.dto.Paging;
import org.example.sensor.service.dto.SensorDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import static org.example.sensor.controller.ControllerHelper.checkBindingResultAndThrowExceptionIfInvalid;


@Validated
@RestController
@RequestMapping("/sensors")
@CrossOrigin(origins = "http://localhost:3000")
public class SensorController {

    private final SensorService sensorService;

    @Autowired
    public SensorController(SensorService sensorService) {
        this.sensorService = sensorService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<SensorDto> findById(@PathVariable @Positive Long id) {
        return new ResponseEntity<>(sensorService.findById(id), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<SensorDto> add(@RequestBody @Valid SensorDto sensorDto,
                                         BindingResult result) {
        checkBindingResultAndThrowExceptionIfInvalid(result);
        SensorDto sensor = sensorService.save(sensorDto);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(sensor.getId()).toUri());
        return new ResponseEntity<>(sensor, httpHeaders, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<SensorDto> update(@PathVariable @Positive Long id,
                                            @RequestBody @Valid SensorDto sensorDto,
                                            BindingResult result) {
        checkBindingResultAndThrowExceptionIfInvalid(result);
        sensorDto.setId(id);
        return new ResponseEntity<>(sensorService.update(sensorDto), HttpStatus.OK);
    }


//    @PreAuthorize("hasRole('Administrator')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable @Positive Long id) {
        sensorService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @GetMapping()
    public ResponseEntity<?> findAllBySearchString(
            @RequestParam(defaultValue = "10", value = "size") Integer size,
            @RequestParam(defaultValue = "0", value = "page") Integer page,
            @RequestParam(defaultValue = "", value = "searchString") String searchString) {

        Paging paging = new Paging(size, page);

        return new ResponseEntity<>(sensorService.findAllBySearchString(paging, searchString), HttpStatus.OK);
    }
}
