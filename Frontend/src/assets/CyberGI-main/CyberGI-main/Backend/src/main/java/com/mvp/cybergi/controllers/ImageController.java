package com.mvp.cybergi.controllers;

import com.mvp.cybergi.entity.Image;
import com.mvp.cybergi.security.services.UserDetailsServiceImpl;
import com.mvp.cybergi.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200",allowCredentials ="true",maxAge = 3600)
    @RestController
    @RequestMapping("/api/v1/images")
    public class ImageController {

        @Autowired
        private ImageService imageService;

        @Autowired
        UserDetailsServiceImpl userDetailsService;
        @PostMapping("/upload")
        public ResponseEntity<Map> uploadImage(@RequestParam("name")String name, @RequestParam("file") MultipartFile file, @RequestParam("userId") Long userId) {
            try {
                Map uploadResult = imageService.uploadImage(name, file, userId);
                return ResponseEntity.ok(uploadResult);
            } catch (IOException e) {
                return ResponseEntity.status(500).body(null);
            }
        }


        @GetMapping("/user/{userId}")
        public ResponseEntity<List<Image>> getImagesByUserId(@PathVariable Long userId) {
            List<Image> images = imageService.getImagesByUserId(userId);
            return ResponseEntity.ok(images);
        }
        @GetMapping("/user/images")
        public ResponseEntity<List<Image>> getImages() {
            List<Image> images = imageService.getImages();
            return ResponseEntity.ok(images);
        }

        @GetMapping("/user/{userId}/first")
        public ResponseEntity<Image> getFirstImageByUserId(@PathVariable Long userId) {
            Image image = imageService.getFirstImageByUserId(userId);
            if (image != null) {
                return ResponseEntity.ok(image);
            } else {
                return ResponseEntity.notFound().build();  // Return 404 if no image found
            }
        }


    }
