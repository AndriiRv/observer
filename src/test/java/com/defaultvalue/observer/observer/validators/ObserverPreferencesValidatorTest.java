package com.defaultvalue.observer.observer.validators;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ObserverPreferencesValidatorTest {

    private final ObserverPreferencesValidator validator = new ObserverPreferencesValidator();

    @Test
    void test_isPathValid() {
        assertAll(
                () -> assertTrue(validator.isPathValid("https://www.example.com")),
                () -> assertTrue(validator.isPathValid("http://www.example.com")),
                () -> assertTrue(validator.isPathValid("https://example.com")),
                () -> assertTrue(validator.isPathValid("http://example.com")),
                () -> assertFalse(validator.isPathValid("https://example")),
                () -> assertFalse(validator.isPathValid("http://example")),
                () -> assertFalse(validator.isPathValid("https://.")),
                () -> assertFalse(validator.isPathValid("http://.")),
                () -> assertFalse(validator.isPathValid("https://")),
                () -> assertFalse(validator.isPathValid("http://"))
        );
    }
}
