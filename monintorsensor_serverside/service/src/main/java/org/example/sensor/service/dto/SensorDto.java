package org.example.sensor.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SensorDto extends AbstractDto {

    @NotBlank(message = "Name can`t be null and spaces!")
    @Pattern(regexp = ".{2,30}", message = "Name must be more then 2 symbols, but smaller than 30")
    private String name;

    @NotBlank(message = "Model can`t be null and spaces!")
    @Pattern(regexp = ".{2,15}", message = "Model must be more then 2 symbols, but smaller than 15")
    private String model;

    private Integer rangeFrom;

    private Integer rangeTo;

    @Valid
    private TypeDto type;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Valid
    private LocationDto location;

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
//    @Pattern(regexp = ".{1,200}", message = "Description must be more then 2 symbols, but smaller than 200")
    private String description;

    public SensorDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getRangeFrom() {
        return rangeFrom;
    }

    public void setRangeFrom(Integer rangeFrom) {
        this.rangeFrom = rangeFrom;
    }

    public Integer getRangeTo() {
        return rangeTo;
    }

    public void setRangeTo(Integer rangeTo) {
        this.rangeTo = rangeTo;
    }

    public TypeDto getType() {
        return type;
    }

    public void setType(TypeDto type) {
        this.type = type;
    }

    public LocationDto getLocation() {
        return location;
    }

    public void setLocation(LocationDto location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
