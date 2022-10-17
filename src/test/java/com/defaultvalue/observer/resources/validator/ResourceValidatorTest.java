package com.defaultvalue.observer.resources.validator;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertFalse;

public class ResourceValidatorTest {

    private final ResourceValidator validator = new ResourceValidator();

    @Test
    void test_isPathValid() {
        assertAll(
                () -> assertTrue(validator.isPathValid("https://www.example.com")),
                () -> assertTrue(validator.isPathValid("http://www.example.com")),
                () -> assertTrue(validator.isPathValid("https://example.com")),
                () -> assertTrue(validator.isPathValid("http://example.com")),
                () -> assertFalse(validator.isPathValid("https://example")),
                () -> assertFalse(validator.isPathValid("http://example")),
                () -> assertFalse(validator.isPathValid("https://k")),
                () -> assertFalse(validator.isPathValid("https://.")),
                () -> assertFalse(validator.isPathValid("http://.")),
                () -> assertFalse(validator.isPathValid("https://")),
                () -> assertFalse(validator.isPathValid("http://"))
        );
    }
}
