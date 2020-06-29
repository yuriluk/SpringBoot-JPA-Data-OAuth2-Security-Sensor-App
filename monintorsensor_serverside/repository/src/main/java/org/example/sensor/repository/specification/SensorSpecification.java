package org.example.sensor.repository.specification;

import org.example.sensor.model.Sensor;
import org.springframework.data.jpa.domain.Specification;

public final class SensorSpecification {

    private SensorSpecification() {
    }

    public static Specification<Sensor> findBySensorNameLike(String searchParam) {
        return (Specification<Sensor>) (root, query, criteriaBuilder) ->
                criteriaBuilder
                        .like(root.get("name"), '%' + searchParam + '%');
    }


    public static Specification<Sensor> findBySensorModelLike(String searchParam) {
        return (Specification<Sensor>) (root, query, criteriaBuilder) ->
                criteriaBuilder
                        .like(root.get("model"), '%' + searchParam + '%');
    }


    public static Specification<Sensor> findBySensorTypeLike(String searchParam) {
        return (Specification<Sensor>) (root, query, criteriaBuilder) ->
                criteriaBuilder
                        .like(root.get("type").get("name"), '%' + searchParam + '%');
    }


    public static Specification<Sensor> findBySensorLocationLike(String searchParam) {
        return (Specification<Sensor>) (root, query, criteriaBuilder) ->
                criteriaBuilder
                        .like(root.get("location").get("name"), '%' + searchParam + '%');
    }


    public static Specification<Sensor> findBySensorDescriptionLike(String searchParam) {
        return (Specification<Sensor>) (root, query, criteriaBuilder) ->
                criteriaBuilder
                        .like(root.get("description"), '%' + searchParam + '%');
    }
}