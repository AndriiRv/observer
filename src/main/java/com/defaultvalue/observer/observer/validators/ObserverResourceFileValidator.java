package com.defaultvalue.observer.observer.validators;

import org.springframework.stereotype.Component;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class ObserverResourceFileValidator {

    /**
     * Check if resource starts with comment character then skip this resource line in resource file.
     *
     * @param line             passed resource as String.
     * @param commentCharacter passed comment character as String.
     * @return boolean flag.
     */
    public boolean isResourceStartsWithCommentChar(String line, String commentCharacter) {
        return !isResourceEmpty(line) && line.startsWith(commentCharacter);
    }

    /**
     * Check is resource contains two or more comment characters in resource line.
     * If resource contains two or more comment characters then skip this resource line in resource file.
     *
     * @param line             passed resource as String.
     * @param commentCharacter passed comment character as String.
     * @return boolean flag.
     */
    public boolean isResourceContainsMoreThanOneCommentChar(String line, String commentCharacter) {
        return !isResourceEmpty(line) && calculateMatchCommentChar(line, commentCharacter) > 1;
    }

    /**
     * Calculate count comment characters in one String.
     *
     * @param line             passed resource as String.
     * @param commentCharacter passed comment character as String.
     * @return boolean flag.
     */
    int calculateMatchCommentChar(String line, String commentCharacter) {
        Matcher matcher = Pattern.compile(commentCharacter).matcher(line);
        return (int) matcher.results().count();
    }

    /**
     * Check is resource contains separate character in resource line.
     *
     * @param line              passed resource as String.
     * @param separateCharacter passed separate character as String.
     * @return boolean flag.
     */
    public boolean isResourceContainsSeparateLine(String line, String separateCharacter) {
        return !isResourceEmpty(line) && line.contains(separateCharacter);
    }

    /**
     * Check is resource as String is null or is blank.
     *
     * @param line passed resource as String.
     * @return boolean flag.
     */
    public boolean isResourceEmpty(String line) {
        return line == null || line.isBlank();
    }
}
