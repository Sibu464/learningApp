package com.mvp.cybergi.controllers;


import com.mvp.cybergi.models.CompletedModule;
import com.mvp.cybergi.service.CompletedModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:4200",allowCredentials ="true",maxAge = 3600)
@RestController
@RequestMapping("/api/modules")
public class CompletedModuleController {
    @Autowired
    private CompletedModuleService service;

    @GetMapping("/completed/{userId}")
    public List<CompletedModule> getCompletedModules(@PathVariable Long userId){
        return service.getCompletedModulesByUserId(userId);
    }

//    @PostMapping("/completed")
//    public CompletedModule addCompletedModule(@RequestBody CompletedModule module) {
//        return service.saveCompletedModule(module);
//    }

}
