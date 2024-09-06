package com.mvp.cybergi.entity.quiz;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name = "content")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String contentText;
    private String contentUrl; // Renamed to follow Java naming conventions

    // Many contents can belong to one module
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id_fk")
    @JsonIgnore // Ignore notifications to reduce nesting
    private Mod mod;

    // Each content belongs to one question
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id_fk")
    @JsonIgnore // Ignore notifications to reduce nesting
    private Question question;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContentText() {
        return contentText;
    }

    public void setContentText(String contentText) {
        this.contentText = contentText;
    }

    public String getContentUrl() {
        return contentUrl;
    }

    public void setContentUrl(String contentUrl) {
        this.contentUrl = contentUrl;
    }

    public Mod getMod() {
        return mod;
    }

    public void setMod(Mod mod) {
        this.mod = mod;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }
}
