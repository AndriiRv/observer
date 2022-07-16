package com.defaultvalue.observer.observer.controllers;

import com.defaultvalue.observer.observer.dtos.ResponseDto;
import com.defaultvalue.observer.observer.exceptions.ObserverException;
import com.defaultvalue.observer.observer.validators.ObserverPreferencesValidator;
import com.defaultvalue.observer.resources.dtos.ResourceCommand;
import com.defaultvalue.observer.resources.dtos.transform.ResourceTransform;
import com.defaultvalue.observer.resources.models.Resource;
import com.defaultvalue.observer.observer.services.ObserverService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequestMapping("/preferences")
public class ObserverPreferencesController {

    private static final Logger LOG = LoggerFactory.getLogger(ObserverPreferencesController.class);

    private final ObserverService<Resource> observerService;
    private final ResourceTransform resourceTransform;
    private final ObserverPreferencesValidator observerPreferencesValidator;

    public ObserverPreferencesController(@Qualifier("observerResourcePreferencesServiceImpl") ObserverService<Resource> observerService,
                                         ResourceTransform resourceTransform,
                                         ObserverPreferencesValidator observerPreferencesValidator) {
        this.observerService = observerService;
        this.resourceTransform = resourceTransform;
        this.observerPreferencesValidator = observerPreferencesValidator;
    }

    @GetMapping
    public String index(Model model) {
        try {
            model.addAttribute("resources", observerService.findAll());
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
    public String save(@ModelAttribute ResourceCommand resourceCommand, RedirectAttributes redirectAttributes) {
        try {
            Resource resource = resourceTransform.transformFromCommand(resourceCommand);
            observerPreferencesValidator.isDataValid(resource);
            observerService.save(resource);
        } catch (ObserverException e) {
            LOG.error(e.getMessage(), e);
            redirectAttributes.addFlashAttribute("resourceDataErrorMessage", e.getMessage());
        } catch (Exception e) {
            String errorMessage = "Resource is not saved. Please try again.";
            LOG.error("Exception during save resource.", e);
            redirectAttributes.addFlashAttribute("resourceDataErrorMessage", errorMessage);
        }
        return "redirect:/preferences";
    }

    @PutMapping("/resources")
    @ResponseBody
    public ResponseEntity<ResponseDto> update(@RequestBody ResourceCommand resourceCommand) {
        try {
            Resource resource = resourceTransform.transformFromCommand(resourceCommand);
            observerService.save(resource);
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
            List<Resource> resources = observerService.findAll();
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

    @DeleteMapping("/resources/{id}")
    @ResponseBody
    public ResponseEntity<ResponseDto> remove(@PathVariable Integer id) {
        try {
            return observerService.deleteById(id)
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
