package org.example.sensor.service.dto.mapper;

import org.example.sensor.model.User;
import org.example.sensor.service.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserMapper extends AbstractMapper<User, UserDto> {

    @Autowired
    public UserMapper() {
        super(User.class, UserDto.class);
    }

}