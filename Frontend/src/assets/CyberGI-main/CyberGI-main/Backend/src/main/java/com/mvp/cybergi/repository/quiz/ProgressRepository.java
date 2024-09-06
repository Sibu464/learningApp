package com.mvp.cybergi.repository.quiz;

import com.mvp.cybergi.entity.User;
import com.mvp.cybergi.entity.quiz.Mod;
import com.mvp.cybergi.entity.quiz.Progress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProgressRepository extends JpaRepository<Progress,Long> {
    Progress findByUserAndModule(Optional<User> user, Mod module);
}
