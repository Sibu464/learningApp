package com.mvp.cybergi.service.quiz;

import com.mvp.cybergi.entity.quiz.Question;
import com.mvp.cybergi.repository.quiz.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    // Method to get all questions
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    // Method to get questions by module ID
    public List<Question> getQuestionsByModule(Long moduleId) {
        return questionRepository.findByModuleId(moduleId);
    }
}
