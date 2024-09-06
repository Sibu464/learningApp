package com.mvp.cybergi.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

//CloudinaryServices (for converting the image into URL)

public interface CloudinaryService {
    public ResponseEntity<Map<String, String>> uploadImage(String name, MultipartFile file);
}
