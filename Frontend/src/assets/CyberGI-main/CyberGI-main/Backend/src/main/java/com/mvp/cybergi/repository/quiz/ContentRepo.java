package com.mvp.cybergi.repository.quiz;

import com.mvp.cybergi.entity.quiz.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContentRepo extends JpaRepository<Content, Long> {

}
