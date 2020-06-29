package org.example.sensor.model;

public enum SupportedAuthProvider {
    LOCAL("local"),
    GOOGLE("google"),
    GITHUB("github"),
    FACEBOOK("facebook");

    private String name;

    SupportedAuthProvider(String name) {
        this.name = name;
    }

}
