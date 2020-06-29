package org.example.sensor.service.impl;

import org.example.sensor.model.SupportedAuthProvider;
import org.example.sensor.model.User;
import org.example.sensor.repository.RoleRepository;
import org.example.sensor.repository.UserRepository;
import org.example.sensor.security.dto.SignUpRequest;
import org.example.sensor.service.UserService;
import org.example.sensor.service.dto.Paging;
import org.example.sensor.service.dto.UserDto;
import org.example.sensor.service.dto.mapper.UserMapper;
import org.example.sensor.service.exception.ResourceNotFoundException;
import org.example.sensor.service.exception.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;


@Service
public class UserServiceImpl implements UserService {


    public static final String ROLE_USER = "Viewer";

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }


    @Transactional
    @Override
    public UserDto save(UserDto userDto) {
        userRepository.findByLogin(userDto.getLogin())
                .ifPresent(user -> {
                            throw new ServiceException("Login " + user.getLogin() + " already in use.");
                        }
                );
        User user = userMapper.toEntity(userDto);
        user.setLastVisit(LocalDateTime.now());
        user.setRoles(Collections.singleton(roleRepository.findByName(ROLE_USER)));
        User userToAdd = userRepository.save(user);
        return userMapper.toDto(userToAdd);
    }


    @Override
    public UserDto update(UserDto userDto) {
        User prevUser = userRepository.findById(userDto.getId())
                .orElseThrow(() -> new ResourceNotFoundException(userDto.getId()));
        User user = userMapper.toEntity(userDto);
        user.setRoles(prevUser.getRoles());
        user.setLastVisit(LocalDateTime.now());
        return userMapper.toDto(userRepository.save(user));
    }


    @Override
    public void delete(Long id) {
        throw new UnsupportedOperationException("Delete method does not supported!");
    }


    @Transactional
    @Override
    public UserDto findById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        return userMapper.toDto(user);
    }

    @Override
    public List<UserDto> findAll(Paging paging) {
        Pageable pageable = PageRequest.of(paging.getPage(), paging.getSize());
        Page<User> page = userRepository.findAll(pageable);
        return userMapper.toDtoList(page.toList());
    }

    @Transactional
    @Override
    public Optional<UserDto> findByLogin(String login) {
        Optional<User> user = userRepository.findByLogin(login);
        return user.map(userMapper::toDto);
    }

    @Transactional
    @Override
    public Boolean existsByLogin(String login) {
        return userRepository.existsByLogin(login);
    }

    @Override
    public UserDto signUp(SignUpRequest signUpRequest) {
        UserDto userDto = new UserDto();
        userDto.setName(signUpRequest.getName());
        userDto.setLogin(signUpRequest.getLogin());
        userDto.setProvider(SupportedAuthProvider.LOCAL);
        userDto.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        return this.save(userDto);
    }
}