package com.defaultvalue.observer.test.controller;

import com.defaultvalue.observer.dto.ResponseDto;
import com.defaultvalue.observer.model.Resource;
import com.defaultvalue.observer.service.ObserverService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/observer/test")
public class ObserverTestController {

    private static final Logger LOG = LoggerFactory.getLogger(ObserverTestController.class);

    private final ObserverService<Resource> observerService;

    public ObserverTestController(@Qualifier("observerTestServiceImpl") ObserverService<Resource> observerService) {
        this.observerService = observerService;
    }

    @GetMapping
    public String index() {
        return "index.html";
    }

    @GetMapping("/resources")
    @ResponseBody
    public ResponseEntity<ResponseDto> getResources() {
        try {
            List<Resource> resources = observerService.findAll();
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(resources));
        } catch (Exception e) {
            String errorMessage = "Resource is not fetching. Please try again.";
            LOG.error("Exception during get all resources.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(errorMessage));
        }
    }
}
