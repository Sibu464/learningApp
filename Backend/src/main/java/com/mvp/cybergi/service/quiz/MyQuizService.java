package com.mvp.cybergi.service.quiz;

import com.mvp.cybergi.entity.quiz.Question;
import com.mvp.cybergi.entity.SubscribedModules;
import com.mvp.cybergi.repository.SubscribedModulesRepo;
import com.mvp.cybergi.repository.quiz.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MyQuizService {
    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private SubscribedModulesRepo subscribedModulesRepo;

    public List<Question> getQuizzesForEmployer(Long employerId) {
        List<SubscribedModules> subscribedModules = subscribedModulesRepo.findByEmployerId(employerId);
        List<Question> questions = new ArrayList<>();

//        for (SubscribedModules sub : subscribedModules) {
//            questions.addAll(questionRepository.findByModuleId(sub.getModule().getId()));
//        }

        return questions;
    }
}
