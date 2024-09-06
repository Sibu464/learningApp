package com.mvp.cybergi.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200",allowCredentials ="true",maxAge = 3600)
@RestController
@RequestMapping("/api/v1/content")
public class ContentController {
    //Public API
    @GetMapping("/all")
    public String allAccess() {
        return "Public content.";
    }
// Logged users APIs
    @GetMapping("/user")
    @PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYER') or hasRole('EMPLOYEE')") //ACCESS CONTROL RULES OR AUTH GUARDS
    public String userAccess(){
        return "Authorized Users content.";
    }
    //EMPLOYERS ONLY APIs
    @GetMapping("/employer")
    @PreAuthorize("hasRole('EMPLOYER')")
    public String employerAccess(){
        return "Employer DashBoard.";
    }
//ADMIN ONLY APIs
    @GetMapping("/admin")
    @PreAuthorize("hasRole ('ADMIN')")
    public String adminAccess(){
        return "Admin DashBoard";
    }
}
