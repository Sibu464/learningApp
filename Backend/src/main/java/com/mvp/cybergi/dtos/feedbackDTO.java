package com.mvp.cybergi.dtos;

public class feedbackDTO {
    private String feedbackText;

    // Constructor
    public feedbackDTO(String feedbackText) {
        this.feedbackText = feedbackText;
    }

    // Getter
    public String getFeedbackText() {
        return feedbackText;
    }


    public void setFeedbackText(String feedbackText) {
        this.feedbackText = feedbackText;
    }
}
