package org.example.sensor.controller;

import org.example.sensor.service.UnitService;
import org.example.sensor.service.dto.UnitDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import static org.example.sensor.controller.ControllerHelper.checkBindingResultAndThrowExceptionIfInvalid;


@Validated
@RestController
@RequestMapping("/units")
@CrossOrigin(origins = "http://localhost:3000")
public class UnitController {

    private final UnitService unitService;

    @Autowired
    public UnitController(UnitService unitService) {
        this.unitService = unitService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UnitDto> findById(@PathVariable @Positive Long id) {
        return new ResponseEntity<>(unitService.findById(id), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<UnitDto> add(@RequestBody @Valid UnitDto unitDto,
                                         BindingResult result) {
        checkBindingResultAndThrowExceptionIfInvalid(result);
        UnitDto unit = unitService.save(unitDto);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(unit.getId()).toUri());
        return new ResponseEntity<>(unit, httpHeaders, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<UnitDto> update(@PathVariable @Positive Long id,
                                            @RequestBody @Valid UnitDto unitDto,
                                            BindingResult result) {
        checkBindingResultAndThrowExceptionIfInvalid(result);
        unitDto.setId(id);
        return new ResponseEntity<>(unitService.update(unitDto), HttpStatus.OK);
    }

    //    @PreAuthorize("hasRole('Administrator')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable @Positive Long id) {
        unitService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @GetMapping()
    public ResponseEntity<?> findAll() {
        return new ResponseEntity<>(unitService.findAll(), HttpStatus.OK);
    }
}
