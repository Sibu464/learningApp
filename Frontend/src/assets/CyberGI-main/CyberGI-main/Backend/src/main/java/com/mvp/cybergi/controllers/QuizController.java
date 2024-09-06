package com.mvp.cybergi.controllers;

import com.mvp.cybergi.dtos.ModDTO;
import com.mvp.cybergi.dtos.QuestionDTO;
import com.mvp.cybergi.dtos.feedbackDTO;
import com.mvp.cybergi.entity.quiz.*;
import com.mvp.cybergi.models.EntityToDTOMapper;
import com.mvp.cybergi.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200",allowCredentials ="true",maxAge = 3600)
@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    // Get questions by module ID
    @GetMapping("/modules/{moduleId}/questions")
    public ResponseEntity<List<QuestionDTO>> getQuestionsByModule(@PathVariable Long moduleId) {
        List<Question> questions = quizService.getQuestionsByModule(moduleId); // Get the list of Question entities
        List<QuestionDTO> questionDTOs = questions.stream()
                .map(EntityToDTOMapper::toQuestionDTO) // Map Question to QuestionDTO
                .collect(Collectors.toList()); // Collect to a list
        return new ResponseEntity<>(questionDTOs, HttpStatus.OK); // Return the DTOs
    }

    @GetMapping("/byquestion/{questionId}")
    public List<Option> getOptionsByQuestionId(@PathVariable Long questionId) {
        return quizService.getOptionsByQuestionId(questionId);
    }



    //get all modules
    @GetMapping("/modules")
    public List<ModDTO> getAllModules() {
        List<Mod> modules = quizService.getAllModules(); // Assuming this returns List<Mod>
        return modules.stream()
                .map(EntityToDTOMapper::toModDTO)
                .collect(Collectors.toList());
    }

    // Get user progress by username and module ID
    @GetMapping("/user-progress/{username}/{moduleId}")
    public ResponseEntity<Integer> getUserProgress(@PathVariable String username, @PathVariable Long moduleId) {
        Progress progress = quizService.getUserProgress(username, moduleId);
        return new ResponseEntity<>(progress.getCurrentQuestionIndex(), HttpStatus.OK);
    }

    // Update user progress
    @PostMapping("/user-progress/{username}/{moduleId}/{currentQuestionIndex}")
    public ResponseEntity<Void> updateUserProgress(@PathVariable String username, @PathVariable Long moduleId, @PathVariable int currentQuestionIndex) {
        quizService.updateUserProgress(username, moduleId, currentQuestionIndex);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Record user answer
    @PostMapping("/user-answer/{username}/{questionId}/{optionId}/{moduleId}/{correct}")
    public ResponseEntity<Void> recordUserAnswer(@PathVariable String username, @PathVariable Long questionId, @PathVariable Long optionId, @PathVariable Long moduleId, @PathVariable boolean correct) {
        quizService.recordUserAnswer(username, questionId, optionId, moduleId, correct);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Get user answers
    @GetMapping("/user-answers/{username}")
    public ResponseEntity<List<UserAnswer>> getUserAnswers(@PathVariable String username) {
        List<UserAnswer> userAnswers = quizService.getUserAnswers(username);
        return new ResponseEntity<>(userAnswers, HttpStatus.OK);
    }

    // Calculate score
    @GetMapping("/calculate-score/{username}/{moduleId}")
    public ResponseEntity<Double> calculateScore(@PathVariable String username, @PathVariable Long moduleId) {
        double score = quizService.calculateScore(username, moduleId);
        return new ResponseEntity<>(score, HttpStatus.OK);
    }

    // Reset user progress
    @PostMapping("/reset-progress/{username}/{moduleId}")
    public ResponseEntity<Void> resetUserProgress(@PathVariable String username, @PathVariable Long moduleId) {
        quizService.resetUserProgress(username, moduleId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/feedback/{questionId}")
    public ResponseEntity<feedbackDTO> getFeedbackByQuestionId(@PathVariable Long questionId) {
        Optional<feedbackDTO> feedbackDTO = quizService.getFeedbackByQuestionId(questionId);
        return feedbackDTO.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
