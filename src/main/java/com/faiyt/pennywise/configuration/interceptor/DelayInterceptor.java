package com.faiyt.pennywise.configuration.interceptor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class DelayInterceptor extends HandlerInterceptorAdapter {

    private Integer sleepTime;

    public DelayInterceptor(String time) {
        this.sleepTime = Integer.parseInt(time);

    }



    private static Logger log = LoggerFactory.getLogger(DelayInterceptor.class);

    /**
     * Executed before actual handler is executed
     **/
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object object) throws Exception {

       log.info("======= ARTIFICIAL DELAY BEGIN " + Integer.toString(sleepTime)  +" MS =========");

        Thread.sleep(sleepTime);

        log.info("======= ARTIFICIAL DELAY END " + Integer.toString(sleepTime)  +" MS =========");
        log.info("======= CHANGE APPLICATION SETTINGS TO DISABLE =========");

        return true;
    }



}
