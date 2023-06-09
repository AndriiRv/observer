package com.defaultvalue.observer.observer.controllers;

import com.defaultvalue.observer.networkcheck.model.NetworkCheck;
import com.defaultvalue.observer.observer.dtos.ResponseDto;
import com.defaultvalue.observer.observer.dtos.WebSocketRequestDto;
import com.defaultvalue.observer.observer.services.ObserverService;
import com.defaultvalue.observer.resources.models.Resource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ObserverStatusRestController {

    private final ObserverService<Resource> observerResourceService;
    private final ObserverService<NetworkCheck> observerNetworksService;

    public ObserverStatusRestController(@Qualifier("observerResourceServiceImpl") ObserverService<Resource> observerResourceService,
                                        @Qualifier("observerNetworkCheckServiceImpl") ObserverService<NetworkCheck> observerNetworksService) {
        this.observerResourceService = observerResourceService;
        this.observerNetworksService = observerNetworksService;
    }

    @MessageMapping("/resources-status")
    @SendTo("/resources-simple-broker/status")
    public ResponseEntity<ResponseDto> getResourceStatus(WebSocketRequestDto dto) {
        Resource resource = observerResourceService.findById(dto.getId());
        return ResponseEntity.ok(new ResponseDto(resource));
    }

    @MessageMapping("/networks-status")
    @SendTo("/networks-simple-broker/status")
    public ResponseEntity<ResponseDto> getNetworksStatus(WebSocketRequestDto dto) {
        NetworkCheck network = observerNetworksService.findById(dto.getId());
        return ResponseEntity.ok(new ResponseDto(network));
    }
}
