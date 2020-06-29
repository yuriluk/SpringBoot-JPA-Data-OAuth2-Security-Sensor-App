package org.example.sensor.model;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "units", schema="public")
public class Unit extends AbstractEntity {

    @Column(name = "name", nullable = false, unique = true, length = 32)
    private String name;


    public Unit() {
    }

    public Unit(Long id) {
        super(id);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Unit other = (Unit) o;
        return name.equals(other.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name);
    }

    @Override
    public String toString() {
        return "Unit{" +
                super.toString() +
                ", name='" + name + '\'' +
                '}';
    }
}
