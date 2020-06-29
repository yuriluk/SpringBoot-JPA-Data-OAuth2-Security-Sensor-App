package org.example.sensor.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TypeDto extends AbstractDto {

    @NotBlank(message = "Type can`t be null and spaces!")
    @Pattern(regexp = ".{2,64}", message = "Type must be more then 2 symbols, but smaller than 64")
    private String name;

    @Valid
    private List<UnitDto> units = new ArrayList<>();

    public TypeDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<UnitDto> getUnits() {
        return units.isEmpty() ? Collections.emptyList() : units;
    }

    public void setUnits(List<UnitDto> units) {
        this.units = units;
    }
}
