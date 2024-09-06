//package com.mvp.cybergi.service;
//
//import com.cloudinary.Cloudinary;
//import com.cloudinary.utils.ObjectUtils;
//import com.mvp.cybergi.entity.Image;
//import com.mvp.cybergi.entity.User;
//import com.mvp.cybergi.models.ImageModel;
//import com.mvp.cybergi.repository.ImageRepository;
//import com.mvp.cybergi.repository.UserRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.HashMap;
//import java.util.Map;
//import java.util.Optional;
//import java.util.UUID;
//
//@Service
//public class ImageServiceImpl implements ImageService {
//
//    @Autowired
//    private Cloudinary cloudinary;
//
//    @Autowired
//    private ImageRepository imageRepository;
//@Autowired
//   private UserRepo userRepository;
//
//
//    public ResponseEntity<Map<String, String>> uploadImage(ImageModel imageModel, Long userId) {
//        try {
//            // Validate input
//            if (imageModel.getName() == null || imageModel.getName().isEmpty()) {
//                return ResponseEntity.badRequest().body(Map.of("error", "Name is required"));
//            }
//
//            MultipartFile file = imageModel.getFile();
//            if (file == null || file.isEmpty()) {
//                return ResponseEntity.badRequest().body(Map.of("error", "File is required"));
//            }
//
//            // Upload file to Cloudinary
//            Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
//                    "public_id", imageModel.getName()
//            ));
//
//            // Extract image URL from the upload result
//            String imageUrl = (String) uploadResult.get("url");
//
//            // Save image metadata to the database
//            Image image = new Image();
//            image.setName(imageModel.getName());
//            image.setUrl(imageUrl);
//            imageRepository.save(image);
//
//            // Prepare and return response
//            Map<String, String> response = new HashMap<>();
//            response.put("message", "File uploaded successfully with URL ");
//            response.put("url", imageUrl);
//            return ResponseEntity.ok(response);
//
//        } catch (IOException e) {
//            e.printStackTrace();
//            return ResponseEntity.status(500).body(Map.of("error", "Internal Server Error"));
//        }
//    }
//    public Map uploadAvatar(MultipartFile file, Long userId) throws IOException {
//        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
//        String imageUrl = uploadResult.get("url").toString();
//
//        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
//        Image image = new Image();
//        image.setUrl(imageUrl);
//        image.setUser(user);
//
//        imageRepository.save(image);
//
//        return uploadResult;
//    }
//    public ResponseEntity<Image> updateImage(UUID id, Image updatedImage) {
//        Optional<Image> existingImageOptional = imageRepository.findById(id);
//        if (existingImageOptional.isPresent()) {
//            Image existingImage = existingImageOptional.get();
//            existingImage.setName(updatedImage.getName());
//            existingImage.setUrl(updatedImage.getUrl());
//            imageRepository.save(existingImage);
//            return ResponseEntity.ok(existingImage);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    public ResponseEntity<Image> getImageByName(String name) {
//        Optional<Image> imageOptional = imageRepository.findByName(name);
//        return imageOptional.map(ResponseEntity::ok)
//                .orElseGet(() -> ResponseEntity.notFound().build());
//    }
//}
