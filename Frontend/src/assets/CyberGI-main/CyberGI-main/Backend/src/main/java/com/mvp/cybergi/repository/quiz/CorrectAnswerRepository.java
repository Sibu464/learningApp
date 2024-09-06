package com.mvp.cybergi.repository.quiz;

import com.mvp.cybergi.entity.quiz.CorrectAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CorrectAnswerRepository extends JpaRepository<CorrectAnswer, Long> {
    CorrectAnswer findByQuestionId(Long questionId);
}
