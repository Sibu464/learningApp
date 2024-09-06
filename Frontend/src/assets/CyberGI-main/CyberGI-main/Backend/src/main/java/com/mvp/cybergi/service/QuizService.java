package com.mvp.cybergi.service;


import com.mvp.cybergi.dtos.feedbackDTO;
import com.mvp.cybergi.entity.User;
import com.mvp.cybergi.entity.quiz.*;
import com.mvp.cybergi.repository.UserRepo;
import com.mvp.cybergi.repository.quiz.*;
//import com.mvp.cybergi.repository.quiz.ModuleRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    @Autowired
    private  FeedbackRepository feedbackRepository;


    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private ProgressRepository progressRepository;

    @Autowired
    private ModuleRepo moduleRepository;

    @Autowired
    private UserAnswerRepository userAnswerRepository;

    @Autowired
    private OptionRepository optionRepository;


    public List<Question> getQuestionsByModule(Long moduleId) {
        return questionRepository.findByModuleId(moduleId);
    }

    public Optional<feedbackDTO> getFeedbackByQuestionId(Long questionId) {
        Optional<Feedback> feedback = feedbackRepository.findByQuestion_Id(questionId);
        return feedback.map(f -> new feedbackDTO(f.getFeedbackText()));
    }

    public Progress getUserProgress(String username, Long moduleId) {
        Optional<User> user = userRepository.findByUsername(username);
        Mod module = moduleRepository.findById(moduleId).orElse(null);
        return progressRepository.findByUserAndModule(user, module);
    }

    public void updateUserProgress(String username, Long moduleId, int currentQuestionIndex) {
        Optional<User> user = userRepository.findByUsername(username);

        Mod module = moduleRepository.findById(moduleId).orElse(null);
        Progress progress = progressRepository.findByUserAndModule(user, module);
        if (progress == null) {
            progress = new Progress();
            if(user.isPresent()){
                User userP=user.get();
                progress.setUser(userP);
            }

            progress.setModule(module);
        }
        progress.setCurrentQuestionIndex(currentQuestionIndex);
        progressRepository.save(progress);
    }

    public void recordUserAnswer(String username, Long questionId, Long optionId, Long moduleId, boolean correct) {
        Optional<User> user = userRepository.findByUsername(username);
        Question question = questionRepository.findById(questionId).orElse(null);
        Option option = optionRepository.findById(optionId).orElse(null);
        Mod module = moduleRepository.findById(moduleId).orElse(null);
        UserAnswer userAnswer = new UserAnswer();
        if(user.isPresent()){
            User userP=user.get();
            userAnswer.setUser(userP);
        }

        userAnswer.setQuestion(question);
        userAnswer.setOption(option);
        userAnswer.setModule(module);
        userAnswer.setCorrect(correct);
        userAnswerRepository.save(userAnswer);
    }

    public List<UserAnswer> getUserAnswers(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return userAnswerRepository.findByUser(user);
    }

    public double calculateScore(String username, Long moduleId) {
        Optional<User> user = userRepository.findByUsername(username);
        Mod module = moduleRepository.findById(moduleId).orElse(null);
        List<UserAnswer> answers = userAnswerRepository.findByUserAndModule(user, module);
        long correctAnswers = answers.stream().filter(UserAnswer::isCorrect).count();
        return (double) correctAnswers / answers.size() * 100;
    }
    @Transactional
    public void resetUserProgress(String username, Long moduleId) {
        Optional<User> user = userRepository.findByUsername(username);
        Mod module = moduleRepository.findById(moduleId).orElse(null);
        Progress progress = progressRepository.findByUserAndModule(user, module);
        if (progress != null) {
            progress.setCurrentQuestionIndex(0);
            progressRepository.save(progress);
        }
        userAnswerRepository.deleteByUserAndModule(user, module);
    }
    public List<Mod>getAllModules(){return moduleRepository.findAll(); }


    public List<Option> getOptionsByQuestionId(Long questionId) {
        return optionRepository.findByQuestionId(questionId);
    }
}