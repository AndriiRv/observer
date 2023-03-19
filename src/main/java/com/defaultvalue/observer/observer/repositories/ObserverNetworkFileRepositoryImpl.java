package com.defaultvalue.observer.observer.repositories;

import com.defaultvalue.observer.networkcheck.model.NetworkCheck;
import com.defaultvalue.observer.observer.enums.ObserverFile;
import com.defaultvalue.observer.observer.helpers.ObserverFileHelper;
import com.defaultvalue.observer.observer.properties.ObserverFileSettings;
import com.defaultvalue.observer.observer.validators.ObserverFileValidator;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public class ObserverNetworkFileRepositoryImpl implements ObserverRepository<NetworkCheck> {

    private final ObserverFileHelper observerFileHelper;
    private final ObserverFileValidator observerFileValidator;
    private final ObserverFileSettings observerFileSettings;

    public ObserverNetworkFileRepositoryImpl(ObserverFileHelper observerFileHelper,
                                             ObserverFileValidator observerFileValidator,
                                             ObserverFileSettings observerFileSettings) {
        this.observerFileHelper = observerFileHelper;
        this.observerFileValidator = observerFileValidator;
        this.observerFileSettings = observerFileSettings;
    }

    @Override
    public boolean save(NetworkCheck networkCheck) {
        List<NetworkCheck> networkChecks = new ArrayList<>(findAll());
        NetworkCheck updatableNetworkCheck = findById(networkCheck.getId()).orElse(null);
        if (updatableNetworkCheck != null) {
            int networkIndex = networkChecks.indexOf(updatableNetworkCheck);
            networkChecks.remove(networkIndex);
            networkChecks.add(networkIndex, networkCheck);
        } else {
            networkChecks.add(networkCheck);
        }
        return saveAll(networkChecks);
    }

    @Override
    public boolean saveAll(Collection<NetworkCheck> networkChecks) {
        StringBuilder sb = new StringBuilder();
        for (NetworkCheck obj : networkChecks) {
            sb.append(obj.getName()).append(observerFileSettings.getNetworks().getSeparateCharacter()).append(obj.getPath()).append("\n");
        }
        return observerFileHelper.saveToFile(sb.toString(), ObserverFile.NETWORKS);
    }

    @Override
    public Optional<NetworkCheck> findById(Integer id) {
        return findAll().stream()
                .filter(e -> e.getId().equals(id))
                .findFirst();
    }

    @Override
    public Collection<NetworkCheck> findAll() {
        String separateCharacter = observerFileSettings.getNetworks().getSeparateCharacter();
        String commentCharacter = observerFileSettings.getNetworks().getCommentCharacter();

        List<NetworkCheck> networkChecks = new ArrayList<>();

        List<String> elements = observerFileHelper.readTheFile(ObserverFile.RESOURCES);
        for (int i = 0; i < elements.size(); i++) {
            String line = elements.get(i);
            if (observerFileValidator.isElementEmpty(line)) {
                continue;
            }

            if (observerFileValidator.isElementStartsWithCommentChar(line, commentCharacter)) {
                continue;
            }

            if (observerFileValidator.isElementContainsMoreThanOneCommentChar(line, commentCharacter)) {
                continue;
            }

            if (!observerFileValidator.isElementContainsSeparateChar(line, separateCharacter)) {
                continue;
            }

            String name = line.substring(0, line.indexOf(separateCharacter));
            String path = line.substring(line.indexOf(separateCharacter) + 1);
            networkChecks.add(new NetworkCheck(i + 1, name, path));
        }

        return networkChecks;
    }

    @Override
    public boolean deleteById(Integer id) {
        Collection<NetworkCheck> resources = findAll();
        resources.remove(new NetworkCheck(id));
        return saveAll(resources);
    }
}
