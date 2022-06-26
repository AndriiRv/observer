package com.defaultvalue.observer.observer.validators;

import org.springframework.stereotype.Component;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class ObserverResourceFileValidator {

    public boolean isResourceEmpty(String line) {
        return line.isEmpty();
    }

    public boolean isResourceStartsWithCommentChar(String line, String commentCharacter) {
        return line.startsWith(commentCharacter);
    }

    public boolean isResourceContainsMoreThanOneCommentChar(String line, String commentCharacter) {
        return calculateMatchCommentChar(line, commentCharacter) > 1;
    }

    public boolean isResourceContainsSeparateLine(String line, String separateCharacter) {
        return line.contains(separateCharacter);
    }

    int calculateMatchCommentChar(String line, String commentCharacter) {
        Matcher matcher = Pattern.compile(commentCharacter).matcher(line);
        return (int) matcher.results().count();
    }
}
