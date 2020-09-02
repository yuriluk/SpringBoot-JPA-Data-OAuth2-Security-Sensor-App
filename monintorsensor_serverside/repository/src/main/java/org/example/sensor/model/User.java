package org.example.sensor.model;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;


@Entity
@Table(name = "users")
public class User extends AbstractEntity {

    @Column(name = "name", nullable = false, length = 20)
    private String name;


    @Column(name = "login", length = 30, nullable = false, unique = true)
    private String login;


    @Column(name = "password", length = 64)
    private String password;


    @Column(name = "image_url", length = 1024)
    private String imageUrl;


    @Column(name = "last_visit", nullable = false)
    private LocalDateTime lastVisit;


    @Column(name = "provider", nullable = false)
    @Enumerated(EnumType.STRING)
    private SupportedAuthProvider provider;


    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE})
    @JoinTable(name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();


    public User() {
    }

    public User(Long id) {
        super(id);
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

    public void setLogin(String email) {
        this.login = email;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public Set<Role> getRoles() {
        return roles.isEmpty() ? Collections.emptySet() : roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        return super.equals(o);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode());
    }

    @Override
    public String toString() {
        return "User{" +
                super.toString() +
                ", name='" + name + '\'' +
                ", email='" + login + '\'' +
                ", password='" + password + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", lastVisit=" + lastVisit +
                ", provider=" + provider +
                ", roles=" + roles +
                '}';
    }
}