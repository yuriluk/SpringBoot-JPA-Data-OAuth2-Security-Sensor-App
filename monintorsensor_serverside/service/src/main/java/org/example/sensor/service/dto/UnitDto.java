package org.example.sensor.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UnitDto extends AbstractDto {

    @NotBlank(message = "Unit can`t be null and spaces!")
    @Pattern(regexp = ".{1,32}", message = "Unit must be more then 2 symbols, but smaller than 32")
    private String name;

    public UnitDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
