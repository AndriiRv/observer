package com.defaultvalue.observer.testpurpose.controller;

import com.defaultvalue.observer.observer.dtos.ResponseDto;
import com.defaultvalue.observer.resources.models.Resource;
import com.defaultvalue.observer.testpurpose.service.ObserverTestServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping
@Profile("test")
public class ObserverTestController {

    private static final Logger LOG = LoggerFactory.getLogger(ObserverTestController.class);

    private final ObserverTestServiceImpl observerService;

    public ObserverTestController(ObserverTestServiceImpl observerService) {
        this.observerService = observerService;
    }

    @GetMapping
    public String index() {
        return "index.html";
    }

    @GetMapping("/size/{sizeValue}")
    public String setupCountOfResources(@PathVariable int sizeValue) {
        observerService.setCountOfResources(sizeValue);
        return "index.html";
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
            LOG.error("Exception during get resource by id. id={}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(errorMessage));
        }
    }
}
