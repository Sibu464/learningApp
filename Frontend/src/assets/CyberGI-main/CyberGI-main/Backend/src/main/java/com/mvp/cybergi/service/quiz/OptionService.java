package com.mvp.cybergi.service.quiz;

import com.mvp.cybergi.entity.quiz.Option;
import com.mvp.cybergi.repository.quiz.OptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OptionService {
    @Autowired
    private OptionRepository optionRepository;


}
