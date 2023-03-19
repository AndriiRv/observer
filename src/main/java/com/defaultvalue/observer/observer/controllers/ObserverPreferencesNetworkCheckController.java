package com.defaultvalue.observer.observer.controllers;

import com.defaultvalue.observer.networkcheck.dtos.NetworkCheckCommand;
import com.defaultvalue.observer.networkcheck.dtos.transform.NetworkCheckTransform;
import com.defaultvalue.observer.networkcheck.model.NetworkCheck;
import com.defaultvalue.observer.observer.dtos.ResponseDto;
import com.defaultvalue.observer.observer.exceptions.ObserverException;
import com.defaultvalue.observer.observer.properties.ObserverFileSettings;
import com.defaultvalue.observer.observer.services.ObserverPreferencesService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/preferences/network-check")
public class ObserverPreferencesNetworkCheckController {

    private static final Logger LOG = LoggerFactory.getLogger(ObserverPreferencesNetworkCheckController.class);

    private final ObserverPreferencesService<NetworkCheck> observerPreferencesService;
    private final NetworkCheckTransform networkCheckTransform;
    private final ObserverFileSettings observerFileSettings;

    public ObserverPreferencesNetworkCheckController(@Qualifier("observerNetworkCheckPreferencesServiceImpl") ObserverPreferencesService<NetworkCheck> observerPreferencesService,
                                                     NetworkCheckTransform networkCheckTransform,
                                                     ObserverFileSettings observerFileSettings) {
        this.observerPreferencesService = observerPreferencesService;
        this.networkCheckTransform = networkCheckTransform;
        this.observerFileSettings = observerFileSettings;
    }

    @PostMapping
    public ResponseEntity<ResponseDto> save(@RequestBody @Valid NetworkCheckCommand networkCheckCommand, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.joining("\n"));
            LOG.error(errorMessage);

            return ResponseEntity.internalServerError().body(new ResponseDto(errorMessage));
        }

        try {
            NetworkCheck resource = networkCheckTransform.transformFromCommand(networkCheckCommand);
            observerPreferencesService.save(resource);
            return ResponseEntity.ok(new ResponseDto(null));
        } catch (Exception e) {
            String errorId = UUID.randomUUID().toString();
            String errorMessage = "Resource is not saved. Please try again. Error: " + errorId;
            LOG.error("Exception during save resource. uuid = {}", errorId, e);

            return ResponseEntity.internalServerError().body(new ResponseDto(errorMessage));
        }
    }

    @PutMapping
    public ResponseEntity<ResponseDto> update(@RequestBody @Valid NetworkCheckCommand networkCheckCommand, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getAllErrors().stream()
                    .map(DefaultMessageSourceResolvable::getDefaultMessage)
                    .collect(Collectors.joining("\n"));
            LOG.error(errorMessage);

            return ResponseEntity.internalServerError().body(new ResponseDto(errorMessage));
        }

        try {
            NetworkCheck resource = networkCheckTransform.transformFromCommand(networkCheckCommand);
            observerPreferencesService.save(resource);
            return ResponseEntity.ok(new ResponseDto(null));
        } catch (Exception e) {
            String errorId = UUID.randomUUID().toString();
            String errorMessage = "Resource is not saved. Please try again. Error: " + errorId;
            LOG.error("Exception during save resource. uuid = {}", errorId, e);

            return ResponseEntity.internalServerError().body(new ResponseDto(errorMessage));
        }
    }

    @GetMapping
    public ResponseEntity<ResponseDto> getNetworkCheck() {
        try {
            List<NetworkCheck> resources = observerPreferencesService.findAll();
            return ResponseEntity.ok(new ResponseDto(resources));
        } catch (Exception e) {
            String errorId = UUID.randomUUID().toString();
            String errorMessage = "Resources are not fetching. Please try again. Error: " + errorId;
            LOG.error("Exception during get all resources. uuid = {}", errorId, e);

            return ResponseEntity.internalServerError().body(new ResponseDto(errorMessage));
        }
    }

    @PutMapping("/swap")
    public ResponseEntity<ResponseDto> swapNetworks(@RequestParam Integer selectedElementId, @RequestParam Integer newSelectedIndex) {
        try {
            observerPreferencesService.swap(selectedElementId, newSelectedIndex);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            String errorId = UUID.randomUUID().toString();
            String errorMessage = "Resources are not swapped. Please try again. Error: " + errorId;
            LOG.error("Exception during swap resources. uuid = {}", errorId, e);

            return ResponseEntity.internalServerError().body(new ResponseDto(errorMessage));
        }
    }

    @DeleteMapping("/{id}")
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

    @PutMapping(value = "/resources/import")
    public ResponseEntity<ResponseDto> importResources(MultipartFile file) {
        try {
            observerPreferencesService.importObject(file);
            return ResponseEntity.ok(new ResponseDto(null));
        } catch (ObserverException e) {
            return ResponseEntity.internalServerError().body(new ResponseDto(e.getMessage()));
        } catch (Exception e) {
            String errorId = UUID.randomUUID().toString();
            String errorMessage = "Import has not performed. Please try again. Error: " + errorId;
            LOG.error("Exception during import networks from file. uuid = {}", errorId, e);

            return ResponseEntity.internalServerError().body(new ResponseDto(errorMessage));
        }
    }

    @GetMapping(value = "/resources/export", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<ByteArrayResource> exportResources() throws IOException {
        ByteArrayResource byteArrayResource = observerPreferencesService.exportObject();

        String fileName = observerFileSettings.getNetworks().getFilename() + "." + observerFileSettings.getNetworks().getFiletype();
        return ResponseEntity.ok()
                .contentLength(byteArrayResource.contentLength())
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .header("Content-Disposition", "attachment; filename=" + fileName)
                .body(byteArrayResource);
    }
}
