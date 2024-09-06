package com.mvp.cybergi.repository.quiz;

import com.mvp.cybergi.entity.quiz.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback,Long> {
    Optional<Feedback> findByQuestion_Id(Long questionId);
}
