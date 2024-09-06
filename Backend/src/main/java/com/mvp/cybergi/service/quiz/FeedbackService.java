package com.mvp.cybergi.service.quiz;

import com.mvp.cybergi.entity.quiz.Feedback;
import com.mvp.cybergi.repository.quiz.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }
}