package com.redsamurai.view.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class RESTSessionHandler implements Filter {
    private FilterConfig _filterConfig = null;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        _filterConfig = filterConfig;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filter) throws IOException, ServletException {
        filter.doFilter(request, response);
        
        HttpServletRequest req = (HttpServletRequest)request;  
        
        if ("POST".equals(req.getMethod()) && req.getHeader("Authorization") != null) {
            HttpSession httpSession = req.getSession();
            
            ((HttpServletResponse)response).addHeader("REST_SESSIONID", httpSession.getId());
            ((HttpServletResponse)response).addHeader("Access-Control-Expose-Headers", "REST_SESSIONID");
        }
    }

    @Override
    public void destroy() {
        _filterConfig = null;
    }
}
