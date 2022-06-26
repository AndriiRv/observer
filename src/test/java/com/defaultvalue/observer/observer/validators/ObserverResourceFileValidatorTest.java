package com.defaultvalue.observer.observer.validators;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

class ObserverResourceFileValidatorTest {

    private final ObserverResourceFileValidator validator = new ObserverResourceFileValidator();

    @Test
    void test_isResourceStartsWithCommentChar() {
        //setup
        String commentCharacter = "//";

        //then
        assertAll(
                () -> assertTrue(validator.isResourceStartsWithCommentChar("//notCommentLine", commentCharacter)),
                () -> assertTrue(validator.isResourceStartsWithCommentChar("//notComme//ntLine", commentCharacter)),
                () -> assertTrue(validator.isResourceStartsWithCommentChar("//", commentCharacter)),
                () -> assertFalse(validator.isResourceStartsWithCommentChar("notCommentLine//", commentCharacter)),
                () -> assertFalse(validator.isResourceStartsWithCommentChar("notCommentLine", commentCharacter)),
                () -> assertFalse(validator.isResourceStartsWithCommentChar(" ", commentCharacter)),
                () -> assertFalse(validator.isResourceStartsWithCommentChar("", commentCharacter)),
                () -> assertFalse(validator.isResourceStartsWithCommentChar(null, commentCharacter))
        );
    }

    @Test
    void test_isResourceContainsMoreThanOneCommentChar() {
        //setup
        String commentCharacter = "//";

        //then
        assertAll(
                () -> assertTrue(validator.isResourceContainsMoreThanOneCommentChar("//notCo//mment//Line", commentCharacter)),
                () -> assertTrue(validator.isResourceContainsMoreThanOneCommentChar("//notCo//mmentLine", commentCharacter)),
                () -> assertFalse(validator.isResourceContainsMoreThanOneCommentChar("//notCommentLine", commentCharacter)),
                () -> assertFalse(validator.isResourceContainsMoreThanOneCommentChar("notComme//ntLine", commentCharacter)),
                () -> assertFalse(validator.isResourceContainsMoreThanOneCommentChar("notCommentLine//", commentCharacter)),
                () -> assertFalse(validator.isResourceContainsMoreThanOneCommentChar("notCommentLine", commentCharacter)),
                () -> assertFalse(validator.isResourceContainsMoreThanOneCommentChar(" ", commentCharacter)),
                () -> assertFalse(validator.isResourceContainsMoreThanOneCommentChar("", commentCharacter)),
                () -> assertFalse(validator.isResourceContainsMoreThanOneCommentChar(null, commentCharacter))
        );
    }

    @Test
    void test_isResourceContainsSeparateChar() {
        //setup
        String separateCharacter = "|";

        //then
        assertAll(
                () -> assertTrue(validator.isResourceContainsSeparateChar("resourceName|resourcePath", separateCharacter)),
                () -> assertTrue(validator.isResourceContainsSeparateChar("resourceName|resou|rcePath", separateCharacter)),
                () -> assertFalse(validator.isResourceContainsSeparateChar("resourceName_resourcePath", separateCharacter)),
                () -> assertFalse(validator.isResourceContainsSeparateChar("resourceName", separateCharacter)),
                () -> assertFalse(validator.isResourceContainsSeparateChar(" ", separateCharacter)),
                () -> assertFalse(validator.isResourceContainsSeparateChar("", separateCharacter)),
                () -> assertFalse(validator.isResourceContainsSeparateChar(null, separateCharacter))
        );
    }

    @Test
    void test_isResourceEmpty() {
        assertAll(
                () -> assertFalse(validator.isResourceEmpty("exampleResourceName")),
                () -> assertTrue(validator.isResourceEmpty(" ")),
                () -> assertTrue(validator.isResourceEmpty("")),
                () -> assertTrue(validator.isResourceEmpty(null))
        );
    }
}
