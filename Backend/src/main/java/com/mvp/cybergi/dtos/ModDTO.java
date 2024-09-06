package com.mvp.cybergi.dtos;

import java.util.List;

public class ModDTO {
    private Long id;
    private String name;
    private String description;
    private String pictureUrl;
//    private List<ContentDTO> contents;
//    private List<QuestionDTO> questions;
//    private List<ProgressDTO> progresses;
//    private List<UserAnswerDTO> userAnswers;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

//    public List<ContentDTO> getContents() {
//        return contents;
//    }
//
//    public void setContents(List<ContentDTO> contents) {
//        this.contents = contents;
//    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

//    public List<QuestionDTO> getQuestions() {
//        return questions;
//    }
//
//    public void setQuestions(List<QuestionDTO> questions) {
//        this.questions = questions;
//    }
//
//    public List<ProgressDTO> getProgresses() {
//        return progresses;
//    }

//    public void setProgresses(List<ProgressDTO> progresses) {
//        this.progresses = progresses;
//    }
//
//    public List<UserAnswerDTO> getUserAnswers() {
//        return userAnswers;
//    }
//
//    public void setUserAnswers(List<UserAnswerDTO> userAnswers) {
//        this.userAnswers = userAnswers;
//    }
}
