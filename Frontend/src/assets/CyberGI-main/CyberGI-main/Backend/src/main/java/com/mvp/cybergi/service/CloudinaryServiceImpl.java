package com.mvp.cybergi.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import jakarta.annotation.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


@Service
public class CloudinaryServiceImpl implements CloudinaryService{
    @Resource
    private Cloudinary cloudinary;

    public ResponseEntity<Map<String, String>> uploadImage(String name, MultipartFile file) {
        try {
            Map<String, String> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                    "public_id", name
            ));

            Map<String, String> response = new HashMap<>();
            response.put("message", "File uploaded successfully");
            response.put("url", uploadResult.get("url"));
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Internal Server Error"));
        }
    }
}
