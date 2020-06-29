package org.example.sensor.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.example.sensor.model.SupportedAuthProvider;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UserDto extends AbstractDto {

    private String name;
    @JsonIgnore
    private String password;
    private String login;
    private String imageUrl;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH.mm")
    private LocalDateTime lastVisit;
    private SupportedAuthProvider provider;
    private List<RoleDto> roles = new ArrayList<>();


    public UserDto() {
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getImageUrl() {
        return Objects.isNull(imageUrl) ? "" : imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public LocalDateTime getLastVisit() {
        return lastVisit;
    }

    public void setLastVisit(LocalDateTime lastVisit) {
        this.lastVisit = lastVisit;
    }

    public SupportedAuthProvider getProvider() {
        return provider;
    }

    public void setProvider(SupportedAuthProvider provider) {
        this.provider = provider;
    }

    public List<RoleDto> getRoles() {
        return roles.isEmpty() ? Collections.emptyList() : roles;
    }

    public void setRoles(List<RoleDto> roles) {
        this.roles = roles;
    }

    @Override
    public String toString() {
        return "UserDto{" +
                super.toString() +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                ", email='" + login + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", lastVisit=" + lastVisit +
                ", provider=" + provider +
                ", roles=" + roles +
                '}';
    }
}
