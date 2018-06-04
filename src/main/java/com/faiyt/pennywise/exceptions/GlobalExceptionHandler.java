package com.faiyt.pennywise.exceptions;

import org.hibernate.TransientObjectException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
@RestController
public class GlobalExceptionHandler {

    private class JsonResponse {
        String message;

        public JsonResponse() {
        }

        public JsonResponse(String message) {
            super();
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<JsonResponse> handleException(Exception e) {
        return new ResponseEntity<JsonResponse>(new JsonResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
    }


//    @ExceptionHandler( { TransientObjectException.class })
//    public ResponseEntity<JsonResponse> handleTransientObjectException(Exception e ) {
//        final String bodyOfResponse = "Object not saved, possibly login issue. Possible bad data structure";
//        System.out.println("this is the code that is executing ");
//        return new ResponseEntity<JsonResponse>(new JsonResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
//    }

}