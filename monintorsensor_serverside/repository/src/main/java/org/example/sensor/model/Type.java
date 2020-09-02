package org.example.sensor.model;

import javax.persistence.*;
import java.util.Collections;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "types")
public class Type extends AbstractEntity {

    @Column(name = "name", nullable = false, unique = true, length = 64)
    private String name;


    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "type_units",
            joinColumns = @JoinColumn(name = "type_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "unit_id", referencedColumnName = "id"))
    private Set<Unit> units = new HashSet<>();


    public Type() {
    }

    public Type(Long id) {
        super(id);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Unit> getUnits() {
        return units.isEmpty() ? Collections.emptySet() : units;
    }

    public void setUnits(Set<Unit> units) {
        this.units = units;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Type type1 = (Type) o;
        return name.equals(type1.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name);
    }

    @Override
    public String toString() {
        return "Type{" +
                super.toString() +
                ", name='" + name + '\'' +
                '}';
    }
}
