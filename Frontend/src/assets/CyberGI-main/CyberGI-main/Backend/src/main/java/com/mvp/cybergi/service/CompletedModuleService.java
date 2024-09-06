package com.mvp.cybergi.service;

import com.mvp.cybergi.models.CompletedModule;
import com.mvp.cybergi.repository.CompletedModuleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompletedModuleService {
    @Autowired
    private CompletedModuleRepo repository;

    public List<CompletedModule> getCompletedModulesByUserId(Long userId) {
        return repository.findByUserId(userId);
    }

    public CompletedModule saveCompletedModule(CompletedModule module) {
        return repository.save(module);
    }
}
