package com.defaultvalue.observer.dto;

public class ResponseDto {

    Object data;
    String message;

    public ResponseDto(Object data, String message) {
        this.data = data;
        this.message = message;
    }

    public ResponseDto(Object data) {
        this.data = data;
    }

    public ResponseDto(String message) {
        this.message = message;
    }

    public ResponseDto() {
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
