package com.mvp.cybergi.repository.quiz;

import com.mvp.cybergi.entity.User;
import com.mvp.cybergi.entity.quiz.Mod;
import com.mvp.cybergi.entity.quiz.UserAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserAnswerRepository extends JpaRepository<UserAnswer,Long> {
    List<UserAnswer> findByUser(Optional<User> user);
    List<UserAnswer> findByUserAndModule(Optional<User> user, Mod module);
    void deleteByUserAndModule(Optional<User>  user, Mod module);
}
