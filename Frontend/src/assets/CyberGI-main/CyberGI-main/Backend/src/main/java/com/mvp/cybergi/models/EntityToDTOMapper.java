package com.mvp.cybergi.models;

import com.mvp.cybergi.dtos.*;
import com.mvp.cybergi.entity.User;
import com.mvp.cybergi.entity.quiz.Mod;
import com.mvp.cybergi.entity.quiz.Progress;
import com.mvp.cybergi.entity.quiz.Question;
import com.mvp.cybergi.entity.quiz.UserAnswer;
import com.mvp.cybergi.entity.quiz.Content;

import java.util.stream.Collectors;

public class EntityToDTOMapper {
    public static ModDTO toModDTO(Mod mod) {
        ModDTO dto = new ModDTO();
        dto.setId(mod.getId());
        dto.setName(mod.getName());
        dto.setDescription(mod.getDescription());
        dto.setPictureUrl(mod.getPictureUrl());
//        dto.setContents(mod.getContents().stream().map(EntityToDTOMapper::toContentDTO).collect(Collectors.toList()));
//        dto.setQuestions(mod.getQuestions().stream().map(EntityToDTOMapper::toQuestionDTO).collect(Collectors.toList()));
//        dto.setProgresses(mod.getProgresses().stream().map(EntityToDTOMapper::toProgressDTO).collect(Collectors.toList()));
//        dto.setUserAnswers(mod.getUserAnswers().stream().map(EntityToDTOMapper::toUserAnswerDTO).collect(Collectors.toList()));
        return dto;
    }

    public static ContentDTO toContentDTO(Content content) {
        ContentDTO dto = new ContentDTO();
        dto.setId(content.getId());
        dto.setContentText(content.getContentText());
        dto.setContentUrl(content.getContentUrl());
        return dto;
    }

    public static QuestionDTO toQuestionDTO(Question question) {
        QuestionDTO dto = new QuestionDTO();
        dto.setId(question.getId());
        dto.setText(question.getText());
        return dto;
    }

    public static ProgressDTO toProgressDTO(Progress progress) {
        ProgressDTO dto = new ProgressDTO();
        dto.setId(progress.getId());
        dto.setUser(toUserDTO(progress.getUser()));
        dto.setModule(toModDTO(progress.getModule()));
        dto.setCurrentQuestionIndex(progress.getCurrentQuestionIndex());
        return dto;
    }

    public static UserDTO toUserDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        return dto;
    }

    public static UserAnswerDTO toUserAnswerDTO(UserAnswer userAnswer) {
        UserAnswerDTO dto = new UserAnswerDTO();
        dto.setId(userAnswer.getId());
        dto.setAnswer(userAnswer.getAnswer());
        return dto;
    }
}