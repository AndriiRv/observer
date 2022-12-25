package com.defaultvalue.observer.observer.controllers;

import com.defaultvalue.observer.observer.dtos.ResponseDto;
import com.defaultvalue.observer.observer.exceptions.ObserverException;
import com.defaultvalue.observer.observer.services.ObserverPreferencesService;
import com.defaultvalue.observer.resources.dtos.ResourceCommand;
import com.defaultvalue.observer.resources.dtos.transform.ResourceTransform;
import com.defaultvalue.observer.resources.models.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
    public String index(Model model) {
        try {
            model.addAttribute("resources", observerPreferencesService.findAll());
        } catch (ObserverException e) {
            model.addAttribute("message", e.getMessage());
        } catch (Exception e) {
            String errorMessage = "Resources are not fetching. Please try again.";
            LOG.error("Exception during get all resources.", e);
            model.addAttribute("message", errorMessage);
        }
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(errorMessage));
        }

        try {
            Resource resource = resourceTransform.transformFromCommand(resourceCommand);
            observerPreferencesService.save(resource);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(null));
        } catch (ObserverException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(e.getMessage()));
        } catch (Exception e) {
            String errorMessage = "Resource is not saved. Please try again.";
            LOG.error("Exception during save resource.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(errorMessage));
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(errorMessage));
        }

        try {
            Resource resource = resourceTransform.transformFromCommand(resourceCommand);
            observerPreferencesService.save(resource);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(null));
        } catch (ObserverException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(e.getMessage()));
        } catch (Exception e) {
            String errorMessage = "Resource is not saved. Please try again.";
            LOG.error("Exception during save resource.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(errorMessage));
        }
    }

    @GetMapping("/resources")
    @ResponseBody
    public ResponseEntity<ResponseDto> getResources() {
        try {
            List<Resource> resources = observerPreferencesService.findAll();
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(resources));
        } catch (ObserverException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(e.getMessage()));
        } catch (Exception e) {
            String errorMessage = "Resources are not fetching. Please try again.";
            LOG.error("Exception during get all resources.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(errorMessage));
        }
    }

    @PutMapping("/resources/swap")
    @ResponseBody
    public ResponseEntity<ResponseDto> swapResources(@RequestParam Integer selectedResourceId, @RequestParam Integer newSelectedIndex) {
        try {
            observerPreferencesService.swap(selectedResourceId, newSelectedIndex);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (ObserverException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(e.getMessage()));
        } catch (Exception e) {
            String errorMessage = "Resources are not swapped. Please try again.";
            LOG.error("Exception during swap resources.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(errorMessage));
        }
    }

    @DeleteMapping("/resources/{id}")
    @ResponseBody
    public ResponseEntity<ResponseDto> remove(@PathVariable Integer id) {
        try {
            return observerPreferencesService.deleteById(id)
                    ? ResponseEntity.ok().body(new ResponseDto("OK"))
                    : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (Exception e) {
            String errorMessage = "Resource is not removed. Please try again.";
            LOG.error("Exception during remove resource by id. id = {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(errorMessage));
        }
    }
}
