package com.defaultvalue.observer.resources.validator;

import com.defaultvalue.observer.resources.dtos.ResourceCommand;
import org.apache.commons.lang3.StringUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ResourceValidator implements ConstraintValidator<ResourceValid, ResourceCommand> {

    @Override
    public boolean isValid(ResourceCommand command, ConstraintValidatorContext context) {
        return nameValidation(command.getName(), context) && pathValidation(command.getPath(), context);
    }

    boolean nameValidation(String name, ConstraintValidatorContext context) {
        if (StringUtils.isNotBlank(name)) {
            return true;
        } else {
            setValidationMessage(context, "Name is not valid. Please try again. Error id = " + UUID.randomUUID()).addConstraintViolation();
            return false;
        }
    }

    boolean pathValidation(String path, ConstraintValidatorContext context) {
        if (StringUtils.isNotBlank(path) && isPathValid(path)) {
            return true;
        } else {
            setValidationMessage(context, "Path is not valid. Please try again. Error id = " + UUID.randomUUID()).addConstraintViolation();
            return false;
        }
    }

    boolean isPathValid(String path) {
        if (path.startsWith("http://localhost:")) {
            return true;
        }

        Pattern pattern = Pattern.compile("https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)");
        Matcher matcher = pattern.matcher(path);
        return matcher.matches();
    }

    ConstraintValidatorContext.ConstraintViolationBuilder setValidationMessage(ConstraintValidatorContext context, String errorMessage) {
        context.disableDefaultConstraintViolation();
        return context.buildConstraintViolationWithTemplate(errorMessage);
    }
}
