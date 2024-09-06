package com.mvp.cybergi.repository;

import com.mvp.cybergi.entity.SubscribedModules;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.ListResourceBundle;

@Repository
public interface SubscribedModulesRepo extends JpaRepository<SubscribedModules, Long> {
    List<SubscribedModules> findByEmployerId(Long employerId);
    List<SubscribedModules> findByIsCompleted(boolean isCompleted);

}
