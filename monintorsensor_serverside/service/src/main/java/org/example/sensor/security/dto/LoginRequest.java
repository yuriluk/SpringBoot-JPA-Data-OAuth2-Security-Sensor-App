package org.example.sensor.security.dto;

import javax.validation.constraints.NotBlank;


public class LoginRequest {

    @NotBlank(message = "login can`t be null or spaces")
    private String login;

    @NotBlank(message = "Password can`t be null or spaces")
    private String password;


    protected LoginRequest() {
    }


    public LoginRequest(String login, String password) {
        this.login = login;
        this.password = password;
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
}
