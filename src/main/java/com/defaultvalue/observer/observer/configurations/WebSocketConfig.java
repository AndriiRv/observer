package com.defaultvalue.observer.observer.configurations;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/resources-simple-broker", "/networks-simple-broker");
        config.setApplicationDestinationPrefixes("/observer-app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/observer-resources-status");
        registry.addEndpoint("/observer-resources-status").withSockJS();
        registry.addEndpoint("/observer-networks-status");
        registry.addEndpoint("/observer-networks-status").withSockJS();
    }
}
