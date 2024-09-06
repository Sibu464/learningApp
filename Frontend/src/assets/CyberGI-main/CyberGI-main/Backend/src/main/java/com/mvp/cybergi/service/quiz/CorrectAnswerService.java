package com.mvp.cybergi.service.quiz;

import com.mvp.cybergi.entity.quiz.CorrectAnswer;
import com.mvp.cybergi.repository.quiz.CorrectAnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CorrectAnswerService {
    @Autowired
    private CorrectAnswerRepository correctAnswerRepository;

    public List<CorrectAnswer> getAllCorrectAnswers() {
        return correctAnswerRepository.findAll();
    }
}
