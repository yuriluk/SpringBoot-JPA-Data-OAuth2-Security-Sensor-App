package org.example.sensor.controller;

import org.example.sensor.exception.IllegalRequestException;
import org.springframework.validation.BindingResult;

final class ControllerHelper {

    static void checkBindingResultAndThrowExceptionIfInvalid(BindingResult result) {
        if (result.hasErrors()) {
            throw new IllegalRequestException(result.getFieldErrors());
        }
    }

    private ControllerHelper() {
    }
}
