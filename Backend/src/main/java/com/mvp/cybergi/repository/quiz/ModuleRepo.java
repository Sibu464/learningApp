package com.mvp.cybergi.repository.quiz;

import com.mvp.cybergi.entity.quiz.Mod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModuleRepo extends JpaRepository<Mod, Long> {
List<Mod>findAll();
}
