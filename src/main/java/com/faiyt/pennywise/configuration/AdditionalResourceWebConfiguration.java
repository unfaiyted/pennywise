package com.faiyt.pennywise.configuration;

import com.faiyt.pennywise.configuration.interceptor.DelayInterceptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AdditionalResourceWebConfiguration implements WebMvcConfigurer {

    @Value("${file-upload-path}")
    String imgLocation;

    @Value("${fake-application-delay}")
    String time;

    @Value("${fake-application-delay-enable}")
    boolean delayEnabled;

    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**").addResourceLocations("file:"+ imgLocation);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH")
                .allowedOrigins("*");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        if (delayEnabled) {
            registry.addInterceptor(new DelayInterceptor(time));
        }
    }
}

