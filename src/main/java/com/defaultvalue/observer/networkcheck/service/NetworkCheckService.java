package com.defaultvalue.observer.networkcheck.service;

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

    private final List<String> commands;

    public NetworkCheckService() {
        String windowsOsName = "windows";
        commands = System.getProperty("os.name").toLowerCase().contains(windowsOsName)
                ? new ArrayList<>(List.of("cmd.exe", "/c", "ping -n 3"))
                : new ArrayList<>(List.of("ping -n 3"));
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
                if (exitCode == 0 && stringBuilder.toString().contains("Lost = 0")) {
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
