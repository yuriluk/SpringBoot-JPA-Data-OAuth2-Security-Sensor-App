package org.example.sensor.controller;

import org.example.sensor.service.TypeService;
import org.example.sensor.service.dto.TypeDto;
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
@RequestMapping("/types")
@CrossOrigin(origins = "http://localhost:3000")
public class TypeController {

    private final TypeService typeService;

    @Autowired
    public TypeController(TypeService typeService) {
        this.typeService = typeService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<TypeDto> findById(@PathVariable @Positive Long id) {
        return new ResponseEntity<>(typeService.findById(id), HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<TypeDto> add(@RequestBody @Valid TypeDto typeDto,
                                         BindingResult result) {
        checkBindingResultAndThrowExceptionIfInvalid(result);
        TypeDto type = typeService.save(typeDto);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(type.getId()).toUri());
        return new ResponseEntity<>(type, httpHeaders, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<TypeDto> update(@PathVariable @Positive Long id,
                                            @RequestBody @Valid TypeDto typeDto,
                                            BindingResult result) {
        checkBindingResultAndThrowExceptionIfInvalid(result);
        typeDto.setId(id);
        return new ResponseEntity<>(typeService.update(typeDto), HttpStatus.OK);
    }

    //    @PreAuthorize("hasRole('Administrator')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable @Positive Long id) {
        typeService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @GetMapping()
    public ResponseEntity<?> findAll() {
        return new ResponseEntity<>(typeService.findAll(), HttpStatus.OK);
    }
}
