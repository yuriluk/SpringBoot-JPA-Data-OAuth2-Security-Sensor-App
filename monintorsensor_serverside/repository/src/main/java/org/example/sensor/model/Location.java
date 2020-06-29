package org.example.sensor.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Objects;

@Entity
@Table(name = "locations", schema="public")
public class Location extends AbstractEntity {

    @Column(name = "name", unique = true, length = 40)
    private String name;


    public Location() {
    }

    public Location(Long id) {
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
        Location unit1 = (Location) o;
        return name.equals(unit1.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name);
    }

    @Override
    public String toString() {
        return "Location{" +
                super.toString() +
                ", name='" + name + '\'' +
                '}';
    }
}
