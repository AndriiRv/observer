package com.defaultvalue.observer.testpurpose.service;

import com.defaultvalue.observer.resources.enums.ResourceStatus;
import com.defaultvalue.observer.resources.models.Resource;
import com.defaultvalue.observer.observer.services.ObserverService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class ObserverTestServiceImpl implements ObserverService<Resource> {

    @Override
    public boolean save(Resource resource) {
        return false;
    }

    @Override
    public Resource findById(Integer id) {
        return null;
    }

    @Override
    public List<Resource> findAll() {
        List<Resource> resources = new ArrayList<>();

        List<ResourceStatus> resourceStatuses = List.of(ResourceStatus.RED, ResourceStatus.ORANGE, ResourceStatus.GREEN);

        for (int i = 0; i < new Random().nextInt(10) + 1; i++) {
            resources.add(new Resource(i, "example", "http://localhost:8080/observer/#", resourceStatuses.get(new Random().nextInt(2))));
        }

        for (int i = 0; i < resources.size(); i++) {
            if (i % 2 == 0) {
                resources.get(i).setStatus(ResourceStatus.GREEN);
            } else if (i % 3 == 0) {
                resources.get(i).setStatus(ResourceStatus.ORANGE);
            } else {
                resources.get(i).setStatus(ResourceStatus.RED);
            }
        }

        return resources;
    }

    @Override
    public boolean deleteById(Integer id) {
        return false;
    }
}
