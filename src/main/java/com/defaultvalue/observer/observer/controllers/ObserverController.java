package com.defaultvalue.observer.observer.controllers;

import com.defaultvalue.observer.networkcheck.model.NetworkCheck;
import com.defaultvalue.observer.observer.dtos.ResponseDto;
import com.defaultvalue.observer.resources.models.Resource;
import com.defaultvalue.observer.observer.services.ObserverService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.UUID;

@Controller
@Profile("!test")
public class ObserverController {

    private static final Logger LOG = LoggerFactory.getLogger(ObserverController.class);

    private final ObserverService<Resource> observerService;
    private final ObserverService<NetworkCheck> observerNetworkCheckService;

    public ObserverController(@Qualifier("observerResourceServiceImpl") ObserverService<Resource> observerService,
                              @Qualifier("observerNetworkCheckServiceImpl") ObserverService<NetworkCheck> observerNetworkCheckService) {
        this.observerService = observerService;
        this.observerNetworkCheckService = observerNetworkCheckService;
    }

    @GetMapping("/observer")
    public String index() {
        return "index.html";
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

    @GetMapping("/resources")
    @ResponseBody
    public ResponseEntity<ResponseDto> getResources() {
        try {
            return ResponseEntity.ok(new ResponseDto(observerService.findAll()));
        } catch (Exception e) {
            String errorId = UUID.randomUUID().toString();
            String errorMessage = "Resource is not fetching. Please try again. Error: " + errorId;
            LOG.error("Exception during get resource by id. id={}, uuid = {}", errorId, e);

            return ResponseEntity.internalServerError().body(new ResponseDto(errorMessage));
        }
    }

    @GetMapping("/networks/{id}")
    @ResponseBody
    public ResponseEntity<ResponseDto> getNetwork(@PathVariable Integer id) {
        try {
            NetworkCheck networkCheck = observerNetworkCheckService.findById(id);
            return ResponseEntity.ok(new ResponseDto(networkCheck));
        } catch (Exception e) {
            String errorId = UUID.randomUUID().toString();
            String errorMessage = "Network is not fetching. Please try again. Error: " + errorId;
            LOG.error("Exception during get resource by id. id={}, uuid = {}", errorId, e);

            return ResponseEntity.internalServerError().body(new ResponseDto(errorMessage));
        }
    }

    @GetMapping("/networks")
    @ResponseBody
    public ResponseEntity<ResponseDto> getNetworks() {
        try {
            return ResponseEntity.ok(new ResponseDto(observerNetworkCheckService.findAll()));
        } catch (Exception e) {
            String errorId = UUID.randomUUID().toString();
            String errorMessage = "Network is not fetching. Please try again. Error: " + errorId;
            LOG.error("Exception during get resource by id. id={}, uuid = {}", errorId, e);

            return ResponseEntity.internalServerError().body(new ResponseDto(errorMessage));
        }
    }
}
