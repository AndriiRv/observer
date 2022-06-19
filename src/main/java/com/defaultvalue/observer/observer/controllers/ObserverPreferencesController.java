package com.defaultvalue.observer.observer.controllers;

import com.defaultvalue.observer.observer.dtos.ResponseDto;
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

import java.util.List;

@Controller
@RequestMapping("/preferences")
public class ObserverPreferencesController {

    private static final Logger LOG = LoggerFactory.getLogger(ObserverPreferencesController.class);

    private final ObserverService<Resource> observerService;
    private final ResourceTransform resourceTransform;

    public ObserverPreferencesController(@Qualifier("observerResourcePreferencesServiceImpl") ObserverService<Resource> observerService,
                                         ResourceTransform resourceTransform) {
        this.observerService = observerService;
        this.resourceTransform = resourceTransform;
    }

    @GetMapping
    public String index(Model model) {
        model.addAttribute("resources", observerService.findAll());
        return "preferences.html";
    }

    @PostMapping("/resources")
    public String save(@ModelAttribute ResourceCommand resourceCommand) {
        try {
            Resource resource = resourceTransform.transformFromCommand(resourceCommand);
            observerService.save(resource);
        } catch (Exception e) {
            LOG.error("Exception during save resource.", e);
        }
        return "redirect:/preferences";
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

    @DeleteMapping("/resources/{id}")
    @ResponseBody
    public ResponseEntity<ResponseDto> remove(@PathVariable Integer id) {
        try {
            return observerService.deleteById(id)
                    ? ResponseEntity.ok().build()
                    : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (Exception e) {
            String errorMessage = "Resource is not removed. Please try again.";
            LOG.error("Exception during remove resource by id. id = {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(errorMessage));
        }
    }
}
