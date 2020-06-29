package org.example.sensor.controller;


import org.example.sensor.exception.ControllerException;
import org.example.sensor.security.TokenProvider;
import org.example.sensor.security.dto.ApiResponse;
import org.example.sensor.security.dto.AuthResponse;
import org.example.sensor.security.dto.LoginRequest;
import org.example.sensor.security.dto.SignUpRequest;
import org.example.sensor.service.UserService;
import org.example.sensor.service.dto.UserDto;
import org.example.sensor.service.dto.UserIdentityAvailability;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

import static org.example.sensor.controller.ControllerHelper.checkBindingResultAndThrowExceptionIfInvalid;


@RestController
@RequestMapping("/auth")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final TokenProvider tokenProvider;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager,
                          UserService userService,
                          TokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.tokenProvider = tokenProvider;
    }


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody @Valid LoginRequest loginRequest,
                                              BindingResult result) {
        checkBindingResultAndThrowExceptionIfInvalid(result);


        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getLogin(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        final String token = tokenProvider.createToken(authentication);
        return ResponseEntity.ok(new AuthResponse(token));
    }


    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody @Valid SignUpRequest signUpRequest,
                                    BindingResult result) {
        checkBindingResultAndThrowExceptionIfInvalid(result);

        if (!signUpRequest.getPassword().equals(signUpRequest.getConfirmedPassword())) {
            throw new ControllerException("The password you entered did not match the confirmed password!");
        }

        UserDto addedUser = userService.signUp(signUpRequest);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/users/me")
                .buildAndExpand(addedUser.getId())
                .toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "User registered successfully!"));
    }


    @GetMapping("/checkLoginAvailability")
    public UserIdentityAvailability checkLoginAvailability(@RequestParam(value = "login") String login) {
        Boolean isAvailable = !userService.existsByLogin(login);
        return new UserIdentityAvailability(isAvailable);
    }
}