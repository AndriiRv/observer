package com.defaultvalue.observer.observer.helpers;

import com.defaultvalue.observer.observer.properties.HttpClientSettings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.net.HttpURLConnection;
import java.net.SocketTimeoutException;
import java.net.URL;

@Component
public class HttpClientHelper {

    private static final Logger LOG = LoggerFactory.getLogger(HttpClientHelper.class);

    private final HttpClientSettings httpClientSettings;

    public HttpClientHelper(HttpClientSettings httpClientSettings) {
        this.httpClientSettings = httpClientSettings;
    }

    public int performGetRequest(String path) {
        return performRequest(path, "GET");
    }

    int performRequest(String path, String httpMethod) {
        HttpURLConnection con = null;
        try {
            URL url = new URL(path);
            con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod(httpMethod);

            con.setConnectTimeout(httpClientSettings.getConnectionTimeout());
            con.setReadTimeout(httpClientSettings.getReadTimeout());

            return con.getResponseCode();
        } catch (SocketTimeoutException e) {
            LOG.error(e.getMessage() + " with " + path);

            if (e.getMessage().equalsIgnoreCase("read timed out")) {
                return HttpStatus.REQUEST_TIMEOUT.value();
            } else if (e.getMessage().equalsIgnoreCase("connect timed out") || e.getMessage().equalsIgnoreCase("connection reset")) {
                return HttpStatus.BAD_REQUEST.value();
            }
        } catch (Exception e) {
            LOG.error(e.getMessage() + " with " + path);

            return HttpStatus.BAD_REQUEST.value();
        } finally {
            if (con != null) {
                con.disconnect();
            }
        }
        return 0;
    }
}
