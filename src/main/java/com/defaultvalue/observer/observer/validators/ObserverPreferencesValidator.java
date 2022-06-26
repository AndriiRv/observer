package com.defaultvalue.observer.observer.validators;

import com.defaultvalue.observer.observer.exceptions.ObserverException;
import com.defaultvalue.observer.resources.models.Resource;
import org.springframework.stereotype.Component;

import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class ObserverPreferencesValidator {

    public void isDataValid(Resource resource) {
        if (!isPathValid(resource.getPath())) {
            String uuid = UUID.randomUUID().toString();
            String errorMessage = "Path is not valid. Please try again. Error id = " + uuid;
            throw new ObserverException(errorMessage);
        }
    }

    boolean isPathValid(String path) {
        Pattern pattern = Pattern.compile("https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)");
        Matcher matcher = pattern.matcher(path);
        return matcher.matches();
    }
}
