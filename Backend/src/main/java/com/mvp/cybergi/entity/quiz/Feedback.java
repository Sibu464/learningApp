package com.mvp.cybergi.entity.quiz;

import jakarta.persistence.*;

@Entity
@Table(name = "feedback")
public class Feedback {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String feedbackText;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id_fk")
    private Question question;

//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "correct_answer_id_fk")
//    private CorrectAnswer correctAnswer;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFeedbackText() {
        return feedbackText;
    }

    public void setFeedbackText(String feedbackText) {
        this.feedbackText = feedbackText;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

//    public CorrectAnswer getCorrectAnswer() {
//        return correctAnswer;
//    }
//
//    public void setCorrectAnswer(CorrectAnswer correctAnswer) {
//        this.correctAnswer = correctAnswer;
//    }
}
