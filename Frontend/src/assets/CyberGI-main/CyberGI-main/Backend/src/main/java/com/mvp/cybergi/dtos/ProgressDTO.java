package com.mvp.cybergi.dtos;

public class ProgressDTO {
    private Long id;
    private UserDTO user;
    private ModDTO module;
    private int currentQuestionIndex;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public ModDTO getModule() {
        return module;
    }

    public void setModule(ModDTO module) {
        this.module = module;
    }

    public int getCurrentQuestionIndex() {
        return currentQuestionIndex;
    }

    public void setCurrentQuestionIndex(int currentQuestionIndex) {
        this.currentQuestionIndex = currentQuestionIndex;
    }
}
