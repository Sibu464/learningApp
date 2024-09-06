package com.mvp.cybergi.controllers;

import com.mvp.cybergi.Payload.request.SubscriptionRequest;
import com.mvp.cybergi.entity.SubscribedModules;
import com.mvp.cybergi.service.SubscribedModulesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;


import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200",allowCredentials ="true",maxAge = 3600)
@RequestMapping("/api/subscribed-modules")
public class SubscribedModulesController {
    private final SubscribedModulesService subscribedModulesService;

    @Autowired
    public SubscribedModulesController(SubscribedModulesService subscribedModulesService) {
        this.subscribedModulesService = subscribedModulesService;
    }

    // Endpoint to get subscribed modules by employer ID
    @GetMapping("/employer/{employerId}")
    public ResponseEntity<List<SubscribedModules>> getSubscribedModulesByEmployerId(@PathVariable Long employerId) {
        List<SubscribedModules> subscribedModules = subscribedModulesService.getSubscribedModulesByEmployerId(employerId);
        return ResponseEntity.ok(subscribedModules);
    }


    // Endpoint to create a new subscribed module
    @PostMapping
    public ResponseEntity<SubscribedModules> createSubscribedModule(@RequestBody SubscriptionRequest subscribedModule) {
        System.out.println(subscribedModule.getModule_id());
        SubscribedModules createdModule = subscribedModulesService.saveSubscribedModule(subscribedModule);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdModule);
    }
    @GetMapping("/completed-modules")
    public List<SubscribedModules> getCompletedModules() {
        return subscribedModulesService.getCompletedModules();
    }
}
