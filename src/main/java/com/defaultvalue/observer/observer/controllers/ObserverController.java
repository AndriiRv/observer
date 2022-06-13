package com.defaultvalue.observer.observer.controllers;

import com.defaultvalue.observer.observer.dtos.ResponseDto;
import com.defaultvalue.observer.resources.models.Resource;
import com.defaultvalue.observer.observer.services.ObserverService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class ObserverController {

    private static final Logger LOG = LoggerFactory.getLogger(ObserverController.class);

    private final ObserverService<Resource> observerService;

    public ObserverController(@Qualifier("observerResourceServiceImpl") ObserverService<Resource> observerService) {
        this.observerService = observerService;
    }

    @GetMapping("/observer")
    public String index() {
        return "index.html";
    }

    @GetMapping("/resources")
    @ResponseBody
    public ResponseEntity<ResponseDto> getResources() {
        try {
            List<Resource> resources = observerService.findAll();
            if (resources.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ResponseDto("No one resources found. Please add resource."));
            }
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(resources));
        } catch (Exception e) {
            String errorMessage = "Resources are not fetching. Please try again.";
            LOG.error("Exception during get all resources.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(errorMessage));
        }
    }

    @GetMapping("/resources/{id}")
    @ResponseBody
    public ResponseEntity<ResponseDto> getResource(@PathVariable Integer id) {
        try {
            Resource resource = observerService.findById(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(resource));
        } catch (Exception e) {
            String errorMessage = "Resource is not fetching. Please try again.";
            LOG.error("Exception during get resource. id={}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(errorMessage));
        }
    }
}
