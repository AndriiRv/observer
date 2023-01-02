package com.defaultvalue.observer.observer.controllers;

import com.defaultvalue.observer.observer.dtos.ResponseDto;
import com.defaultvalue.observer.resources.helpers.ResourceStatusHelper;
import com.defaultvalue.observer.resources.models.Resource;
import com.defaultvalue.observer.observer.services.ObserverService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.UUID;

@Controller
public class ObserverController {

    private static final Logger LOG = LoggerFactory.getLogger(ObserverController.class);

    private final ObserverService<Resource> observerService;
    private final ResourceStatusHelper resourceStatusHelper;

    public ObserverController(@Qualifier("observerResourceServiceImpl") ObserverService<Resource> observerService,
                              ResourceStatusHelper resourceStatusHelper) {
        this.observerService = observerService;
        this.resourceStatusHelper = resourceStatusHelper;
    }

    @GetMapping("/observer")
    public String index() {
        return "index.html";
    }

    @GetMapping("/resources/count")
    @ResponseBody
    public ResponseEntity<ResponseDto> getCountOfResources() {
        try {
            int countOfResources = resourceStatusHelper.countOfResources();
            return countOfResources != 0
                    ? ResponseEntity.ok(new ResponseDto(countOfResources))
                    : ResponseEntity.ok(new ResponseDto("No one resources found. Please add some resource."));
        } catch (Exception e) {
            String errorId = UUID.randomUUID().toString();
            String errorMessage = "Resources are not fetching. Please try again. Error: " + errorId;
            LOG.error("Exception during get count of all resources. uuid = {}", errorId, e);

            return ResponseEntity.internalServerError().body(new ResponseDto(errorMessage));
        }
    }

    @GetMapping("/resources/{id}")
    @ResponseBody
    public ResponseEntity<ResponseDto> getResource(@PathVariable Integer id) {
        try {
            Resource resource = observerService.findById(id);
            return ResponseEntity.ok(new ResponseDto(resource));
        } catch (Exception e) {
            String errorId = UUID.randomUUID().toString();
            String errorMessage = "Resource is not fetching. Please try again. Error: " + errorId;
            LOG.error("Exception during get resource by id. id={}, uuid = {}", errorId, e);

            return ResponseEntity.internalServerError().body(new ResponseDto(errorMessage));
        }
    }
}
