package org.example.sensor.service;


import org.example.sensor.security.dto.SignUpRequest;
import org.example.sensor.service.dto.UserDto;

import java.util.Optional;

public interface UserService extends CrudService<UserDto> {

    Optional<UserDto> findByLogin(String login);

    Boolean existsByLogin(String login);

    UserDto signUp(SignUpRequest signUpRequest);
}