package org.example.sensor.model;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Table(name = "sensors", schema="public")
public class Sensor extends AbstractEntity {

    @Column(name = "name", nullable = false, length = 30)
    private String name;

    @Column(name = "model", nullable = false, length = 15)
    private String model;

    @Column(name = "range_from", nullable = false)
    private Integer rangeFrom;

    @Column(name = "range_to", nullable = false)
    private Integer rangeTo;

    @ManyToOne(cascade=CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "sensor_types",
            joinColumns = @JoinColumn(name = "sensor_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "type_id", referencedColumnName = "id"))
    private Type type;


    @ManyToOne(cascade=CascadeType.MERGE)
    @JoinColumn(name = "location_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Location location;

    @Column(name = "description", length = 200)
    private String description;

    public Sensor() {
    }

    public Sensor(Long id) {
        super(id);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public Integer getRangeFrom() {
        return rangeFrom;
    }

    public void setRangeFrom(Integer rangeFrom) {
        this.rangeFrom = rangeFrom;
    }

    public Integer getRangeTo() {
        return rangeTo;
    }

    public void setRangeTo(Integer rangeTo) {
        this.rangeTo = rangeTo;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
