package com.mvp.cybergi.repository;

import com.mvp.cybergi.models.CompletedModule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompletedModuleRepo extends JpaRepository<CompletedModule, Long> {
List<CompletedModule> findByUserId(Long userId);
}
