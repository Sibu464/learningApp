package com.mvp.cybergi.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.mvp.cybergi.entity.Image;
import com.mvp.cybergi.entity.User;
import com.mvp.cybergi.repository.ImageRepository;
import com.mvp.cybergi.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ImageService {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private UserRepo userRepository; // Ensure you have a UserRepository

    public Map uploadImage(String name, MultipartFile file, Long userId) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        String imageUrl = uploadResult.get("url").toString();

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Image image = new Image();
        image.setName(name);
        image.setUrl(imageUrl);
        image.setUser(user);

        imageRepository.save(image);

        return uploadResult;
    }

    public ResponseEntity<Image> getImageByName(String name) {
        Optional<Image> imageOptional = imageRepository.findByName(name);
        return imageOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    public List<Image> getImagesByUserId(Long userId) {
        return imageRepository.findByUserId(userId);
    }

    public List<Image> getImages() {
        return  imageRepository.findAll();
    }

    public Image getFirstImageByUserId(Long userId) {
        return imageRepository.findFirstByUserId(userId);  // Get the first image for the user
    }

}
