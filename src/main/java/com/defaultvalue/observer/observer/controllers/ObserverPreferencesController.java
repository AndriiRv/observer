package com.defaultvalue.observer.observer.controllers;

import com.defaultvalue.observer.observer.dtos.ResponseDto;
import com.defaultvalue.observer.observer.services.ObserverPreferencesService;
import com.defaultvalue.observer.resources.dtos.ResourceCommand;
import com.defaultvalue.observer.resources.dtos.transform.ResourceTransform;
import com.defaultvalue.observer.resources.models.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/preferences")
public class ObserverPreferencesController {

    private static final Logger LOG = LoggerFactory.getLogger(ObserverPreferencesController.class);

    private final ObserverPreferencesService<Resource> observerPreferencesService;
    private final ResourceTransform resourceTransform;

    public ObserverPreferencesController(@Qualifier("observerResourcePreferencesServiceImpl") ObserverPreferencesService<Resource> observerPreferencesService,
                                         ResourceTransform resourceTransform) {
        this.observerPreferencesService = observerPreferencesService;
        this.resourceTransform = resourceTransform;
    }

    @GetMapping
    public String index() {
        return "preferences.html";
    }

    @PostMapping("/resources")
    @ResponseBody
    public ResponseEntity<ResponseDto> save(@RequestBody @Valid ResourceCommand resourceCommand, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.joining("\n"));
            LOG.error(errorMessage);

            return ResponseEntity.internalServerError().body(new ResponseDto(errorMessage));
        }

        try {
            Resource resource = resourceTransform.transformFromCommand(resourceCommand);
            observerPreferencesService.save(resource);
            return ResponseEntity.ok(new ResponseDto(null));
        } catch (Exception e) {
            String errorId = UUID.randomUUID().toString();
            String errorMessage = "Resource is not saved. Please try again. Error: " + errorId;
            LOG.error("Exception during save resource. uuid = {}", errorId, e);

            return ResponseEntity.internalServerError().body(new ResponseDto(errorMessage));
        }
    }

    @PutMapping("/resources")
    @ResponseBody
    public ResponseEntity<ResponseDto> update(@RequestBody @Valid ResourceCommand resourceCommand, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.joining("\n"));
            LOG.error(errorMessage);

            return ResponseEntity.internalServerError().body(new ResponseDto(errorMessage));
        }

        try {
            Resource resource = resourceTransform.transformFromCommand(resourceCommand);
            observerPreferencesService.save(resource);
            return ResponseEntity.ok(new ResponseDto(null));
        } catch (Exception e) {
            String errorId = UUID.randomUUID().toString();
            String errorMessage = "Resource is not saved. Please try again. Error: " + errorId;
            LOG.error("Exception during save resource. uuid = {}", errorId, e);

            return ResponseEntity.internalServerError().body(new ResponseDto(errorMessage));
        }
    }

    @GetMapping("/resources")
    @ResponseBody
    public ResponseEntity<ResponseDto> getResources() {
        try {
            List<Resource> resources = observerPreferencesService.findAll();
            return ResponseEntity.ok(new ResponseDto(resources));
        } catch (Exception e) {
            String errorId = UUID.randomUUID().toString();
            String errorMessage = "Resources are not fetching. Please try again. Error: " + errorId;
            LOG.error("Exception during get all resources. uuid = {}", errorId, e);

            return ResponseEntity.internalServerError().body(new ResponseDto(errorMessage));
        }
    }

    @PutMapping("/resources/swap")
    @ResponseBody
    public ResponseEntity<ResponseDto> swapResources(@RequestParam Integer selectedResourceId, @RequestParam Integer newSelectedIndex) {
        try {
            observerPreferencesService.swap(selectedResourceId, newSelectedIndex);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            String errorId = UUID.randomUUID().toString();
            String errorMessage = "Resources are not swapped. Please try again. Error: " + errorId;
            LOG.error("Exception during swap resources. uuid = {}", errorId, e);

            return ResponseEntity.internalServerError().body(new ResponseDto(errorMessage));
        }
    }

    @DeleteMapping("/resources/{id}")
    @ResponseBody
    public ResponseEntity<ResponseDto> remove(@PathVariable Integer id) {
        try {
            return observerPreferencesService.deleteById(id)
                    ? ResponseEntity.ok().body(new ResponseDto("OK"))
                    : ResponseEntity.internalServerError().build();
        } catch (Exception e) {
            String errorId = UUID.randomUUID().toString();
            String errorMessage = "Resource is not removed. Please try again. Error: " + errorId;
            LOG.error("Exception during remove resource by id. id = {}, uuid = {}", id, errorId, e);

            return ResponseEntity.internalServerError().body(new ResponseDto(errorMessage));
        }
    }
}
