package com.defaultvalue.observer.observer.helpers;

import com.defaultvalue.observer.observer.properties.httpclient.ObserverHttpClientSettings;
import com.defaultvalue.observer.observer.properties.httpclient.ObserverHttpClientStacktraceSettings;
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

    private final ObserverHttpClientSettings observerHttpClientSettings;
    private final ObserverHttpClientStacktraceSettings observerHttpClientStacktraceSettings;

    public HttpClientHelper(ObserverHttpClientSettings observerHttpClientSettings,
                            ObserverHttpClientStacktraceSettings observerHttpClientStacktraceSettings) {
        this.observerHttpClientSettings = observerHttpClientSettings;
        this.observerHttpClientStacktraceSettings = observerHttpClientStacktraceSettings;
    }

    public int getResponseStatus(String path) {
        return performRequest(path, "GET");
    }

    int performRequest(String path, String httpMethod) {
        HttpURLConnection con = null;
        try {
            URL url = new URL(path);
            con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod(httpMethod);

            con.setConnectTimeout(observerHttpClientSettings.getConnectionTimeout());
            con.setReadTimeout(observerHttpClientSettings.getReadTimeout());

            return con.getResponseCode();
        } catch (SocketTimeoutException e) {
            renderLog(path, e);

            if (e.getMessage().equalsIgnoreCase("read timed out")) {
                return HttpStatus.REQUEST_TIMEOUT.value();
            } else if (e.getMessage().equalsIgnoreCase("connect timed out")
                    || e.getMessage().equalsIgnoreCase("connection reset")) {
                return HttpStatus.BAD_REQUEST.value();
            }
        } catch (Exception e) {
            renderLog(path, e);

            return HttpStatus.BAD_REQUEST.value();
        } finally {
            if (con != null) {
                con.disconnect();
            }
        }
        return 0;
    }

    void renderLog(String path, Exception e) {
        if (observerHttpClientStacktraceSettings.getEnabled()) {
            LOG.warn(e.getMessage() + " with " + path, e);
        } else {
            LOG.warn(e.getMessage() + " with " + path);
        }
    }
}
