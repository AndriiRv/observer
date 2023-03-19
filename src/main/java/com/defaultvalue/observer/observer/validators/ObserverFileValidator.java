package com.defaultvalue.observer.observer.validators;

import org.springframework.stereotype.Component;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class ObserverFileValidator {

    /**
     * Check if element starts with comment character then skip this element line in element file.
     *
     * @param line             passed element as String.
     * @param commentCharacter passed comment character as String.
     * @return boolean flag.
     */
    public boolean isElementStartsWithCommentChar(String line, String commentCharacter) {
        return !isElementEmpty(line) && line.startsWith(commentCharacter);
    }

    /**
     * Check is element contains two or more comment characters in element line.
     * If element contains two or more comment characters then skip this element line in element file.
     *
     * @param line             passed element as String.
     * @param commentCharacter passed comment character as String.
     * @return boolean flag.
     */
    public boolean isElementContainsMoreThanOneCommentChar(String line, String commentCharacter) {
        return !isElementEmpty(line) && calculateMatchCommentChar(line, commentCharacter) > 1;
    }

    /**
     * Calculate count comment characters in one String.
     *
     * @param line             passed element as String.
     * @param commentCharacter passed comment character as String.
     * @return boolean flag.
     */
    int calculateMatchCommentChar(String line, String commentCharacter) {
        Matcher matcher = Pattern.compile(commentCharacter).matcher(line);
        return (int) matcher.results().count();
    }

    /**
     * Check is element contains separate character in element line.
     *
     * @param line              passed element as String.
     * @param separateCharacter passed separate character as String.
     * @return boolean flag.
     */
    public boolean isElementContainsSeparateChar(String line, String separateCharacter) {
        return !isElementEmpty(line) && line.contains(separateCharacter);
    }

    /**
     * Check is element as String is null or is blank.
     *
     * @param line passed element as String.
     * @return boolean flag.
     */
    public boolean isElementEmpty(String line) {
        return line == null || line.isBlank();
    }
}
