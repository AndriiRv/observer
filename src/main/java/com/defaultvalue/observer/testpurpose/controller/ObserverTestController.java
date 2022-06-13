package com.defaultvalue.observer.testpurpose.controller;

import com.defaultvalue.observer.observer.dtos.ResponseDto;
import com.defaultvalue.observer.resources.helpers.ResourceStatusHelper;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/test")
public class ObserverTestController {

    private static final Logger LOG = LoggerFactory.getLogger(ObserverTestController.class);

    private final ObserverService<Resource> observerService;
    private final ResourceStatusHelper resourceStatusHelper;

    public ObserverTestController(@Qualifier("observerTestServiceImpl") ObserverService<Resource> observerService,
                                  ResourceStatusHelper resourceStatusHelper) {
        this.observerService = observerService;
        this.resourceStatusHelper = resourceStatusHelper;
    }

    @GetMapping
    public String index() {
        return "index.html";
    }

    @GetMapping("/resources/count")
    @ResponseBody
    public ResponseEntity<ResponseDto> getCountOfResources() {
        try {
            int countOfResources = observerService.findAll().size();
            if (countOfResources == 0) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ResponseDto("No one resources found. Please add resource."));
            }
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(countOfResources));
        } catch (Exception e) {
            String errorMessage = "Resources are not fetching. Please try again.";
            LOG.error("Exception during get all resources.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(errorMessage));
        }
    }

    @GetMapping("/resources")
    @ResponseBody
    public ResponseEntity<ResponseDto> getResources() {
        try {
            List<Resource> resources = observerService.findAll();
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(resources));
        } catch (Exception e) {
            String errorMessage = "Resource are not fetching. Please try again.";
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
