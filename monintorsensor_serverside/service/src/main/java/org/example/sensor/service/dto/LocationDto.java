package org.example.sensor.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonIgnoreProperties(ignoreUnknown = true)
public class LocationDto extends AbstractDto {

    @JsonInclude(JsonInclude.Include.NON_EMPTY)
//    @Pattern(regexp = ".{1,40}", message = "Location must be more then 2 symbols, but smaller than 40")
    private String name;

    public LocationDto() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
