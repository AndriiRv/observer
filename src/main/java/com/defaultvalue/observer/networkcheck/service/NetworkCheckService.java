package com.defaultvalue.observer.networkcheck.service;

import com.defaultvalue.observer.observer.properties.network_check.ObserverNetworkCheckSettings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class NetworkCheckService {

    private static final Logger LOG = LoggerFactory.getLogger(NetworkCheckService.class);
    private static final String WINDOWS_OS_NAME = "windows";

    private final List<String> commands;

    public NetworkCheckService(ObserverNetworkCheckSettings observerNetworkCheckSettings) {
        commands = System.getProperty("os.name").toLowerCase().contains(WINDOWS_OS_NAME)
                ? new ArrayList<>(List.of("cmd.exe", "/c", "ping -n " + observerNetworkCheckSettings.getRequestsCount()))
                : new ArrayList<>(List.of("ping", "-c", String.valueOf(observerNetworkCheckSettings.getRequestsCount())));
    }

    public boolean isNetworkAccessible(String networkStr) {
        commands.add(networkStr);
        ProcessBuilder processBuilder = new ProcessBuilder(commands);

        try {
            Process process = processBuilder.start();

            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                StringBuilder stringBuilder = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    stringBuilder.append(line);
                    LOG.info(line);
                }

                int exitCode = process.waitFor();
                String terminalStringResult = stringBuilder.toString();
                if (exitCode == 0 && (terminalStringResult.contains("Lost = 0") || terminalStringResult.contains("0% packet loss"))) {
                    return true;
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        } catch (IOException e) {
            LOG.error("Error during check network", e);
        } finally {
            commands.remove(networkStr);
        }
        return false;
    }
}
