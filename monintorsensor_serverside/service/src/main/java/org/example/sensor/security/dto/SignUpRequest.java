package org.example.sensor.security.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

public class SignUpRequest {

    @NotBlank(message = "Name can`t be empty or spaces!")
    @Pattern(regexp = ".{3,30}", message = "Name must be bigger than 3 symbol, but smaller than 30")
    private String name;

    @NotBlank(message = "login can`t be null or spaces")
    private String login;

    @NotBlank(message = "Password can`t be null or spaces")
    @Pattern(regexp = ".{5,30}", message = "Pass can`t be smaller then 5 symbols and bigger then 30 symbols")
    private String password;

    @NotBlank(message = "Confirmed password can`t be null or spaces!")
    @Pattern(regexp = ".{5,30}", message = "Confirmed pass can`t be smaller then 5 symbols and bigger then 30 symbols")
    private String confirmedPassword;

    protected SignUpRequest() {
    }

    public SignUpRequest(@NotNull String name,
                         @NotNull String login,
                         @NotNull String password,
                         @NotNull String confirmedPassword) {
        this.name = name;
        this.login = login;
        this.password = password;
        this.confirmedPassword = confirmedPassword;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmedPassword() {
        return confirmedPassword;
    }

    public void setConfirmedPassword(String confirmedPassword) {
        this.confirmedPassword = confirmedPassword;
    }
}
