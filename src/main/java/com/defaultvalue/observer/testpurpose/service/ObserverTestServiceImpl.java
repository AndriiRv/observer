package com.defaultvalue.observer.testpurpose.service;

import com.defaultvalue.observer.resources.enums.ResourceStatus;
import com.defaultvalue.observer.resources.models.Resource;
import com.defaultvalue.observer.observer.services.ObserverService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Random;

@Service
public class ObserverTestServiceImpl implements ObserverService<Resource> {

    private int countOfResources;
    private List<Resource> resources;

    public ObserverTestServiceImpl() {
        this.setCountOfResources(this.fetchRandomValue());
    }

    public int getCountOfResources() {
        return countOfResources;
    }

    public void setCountOfResources(int countOfResources) {
        if (countOfResources < 0) {
            countOfResources = this.fetchRandomValue();
        }

        this.countOfResources = countOfResources;
        this.resources = this.findAll();
    }

    int fetchRandomValue() {
        return new Random().nextInt(20) + 1;
    }

    @Override
    public boolean save(Resource resource) {
        return false;
    }

    @Override
    public boolean saveAll(Collection<Resource> resources) {
        return false;
    }

    @Override
    public Resource findById(Integer id) {
        for (Resource resource : resources) {
            if (resource.getId().equals(id)) {
                resource.setStatus(getRandomStatus());
                return resource;
            }
        }
        return null;
    }

    ResourceStatus getRandomStatus() {
        int fromZeroToTwo = new Random().nextInt(3);
        if (fromZeroToTwo == 0) {
            return ResourceStatus.GREEN;
        } else if (fromZeroToTwo == 1) {
            return ResourceStatus.ORANGE;
        } else {
            return ResourceStatus.RED;
        }
    }

    @Override
    public List<Resource> findAll() {
        List<Resource> resources = new ArrayList<>();

        for (int i = 0; i < this.countOfResources; i++) {
            int resourceId = i + 1;

            Resource resource = new Resource(
                    resourceId,
                    "example" + resourceId,
                    "http:/example.com",
                    List.of(ResourceStatus.RED, ResourceStatus.ORANGE, ResourceStatus.GREEN).get(new Random().nextInt(2))
            );
            resources.add(resource);
        }

        return resources;
    }

    @Override
    public boolean deleteById(Integer id) {
        return false;
    }
}
