package com.defaultvalue.observer.networkcheck.validator;

import com.defaultvalue.observer.networkcheck.dtos.NetworkCheckCommand;
import org.apache.commons.lang3.StringUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NetworkCheckValidator implements ConstraintValidator<NetworkCheckValid, NetworkCheckCommand> {

    @Override
    public boolean isValid(NetworkCheckCommand command, ConstraintValidatorContext context) {
        return nameValidation(command.getName(), context) && pathValidation(command.getPath(), context);
    }

    public boolean isValid(NetworkCheckCommand command) {
        return StringUtils.isNotBlank(command.getName()) && StringUtils.isNotBlank(command.getPath()) && isPathValid(command.getPath());
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
        Pattern pattern = Pattern.compile("^((25[0-5]|(2[0-4]|1\\d|[1-9]|)\\d)\\.?\\b){4}$");
        Matcher matcher = pattern.matcher(path);
        return matcher.matches();
    }

    ConstraintValidatorContext.ConstraintViolationBuilder setValidationMessage(ConstraintValidatorContext context, String errorMessage) {
        context.disableDefaultConstraintViolation();
        return context.buildConstraintViolationWithTemplate(errorMessage);
    }
}
