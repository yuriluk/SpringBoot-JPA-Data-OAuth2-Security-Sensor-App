package org.example.sensor.controller;


import org.example.sensor.exception.ControllerException;
import org.example.sensor.security.CurrentUser;
import org.example.sensor.security.UserPrincipal;
import org.example.sensor.security.dto.SignUpRequest;
import org.example.sensor.service.UserService;
import org.example.sensor.service.dto.Paging;
import org.example.sensor.service.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.Positive;
import java.util.List;

import static org.example.sensor.controller.ControllerHelper.checkBindingResultAndThrowExceptionIfInvalid;


@RestController
@RequestMapping("/users")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasRole('Administrator')")
    @GetMapping
    public ResponseEntity<List<UserDto>> findAll(@RequestParam(defaultValue = "10", value = "size")
                                                 @Min(value = 1, message = "Min value for size is 1") Integer size,

                                                 @RequestParam(defaultValue = "1", value = "page")
                                                 @Min(value = 1, message = "Min value for page is 1") Integer page) {

        Paging paging = new Paging(size, page);

        return new ResponseEntity<>(userService.findAll(paging), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('Viewer')")
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> findById(@CurrentUser UserPrincipal userPrincipal,
                                            @PathVariable @Positive Long id) {
        if (!userPrincipal.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))
                && !userPrincipal.getId().equals(id)) {
            throw new AccessDeniedException("You have no permissions!");
        }

        UserDto user = userService.findById(id);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @GetMapping("/me")
    public ResponseEntity<UserDto> me(@CurrentUser UserPrincipal userPrincipal) {
        return ResponseEntity.ok(userService.findById(userPrincipal.getId()));
    }

    @PreAuthorize("hasRole('Administrator')")
    @PostMapping
    public ResponseEntity<UserDto> add(@RequestBody @Valid SignUpRequest signUpRequest,
                                       BindingResult result) {
        checkBindingResultAndThrowExceptionIfInvalid(result);
        if (!signUpRequest.getPassword().equals(signUpRequest.getConfirmedPassword())) {
            throw new ControllerException("The password you entered did not match the confirmed password!");
        }
        UserDto addedUser = userService.signUp(signUpRequest);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(addedUser.getId()).toUri());
        return new ResponseEntity<>(addedUser, httpHeaders, HttpStatus.CREATED);
    }
}
