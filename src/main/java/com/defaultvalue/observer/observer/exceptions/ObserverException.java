package com.defaultvalue.observer.observer.exceptions;

public class ObserverException extends RuntimeException {

    public ObserverException(String message) {
        super(message);
    }

    public ObserverException(String message, Throwable cause) {
        super(message, cause);
    }

    public ObserverException(Throwable cause) {
        super(cause);
    }

    public ObserverException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
