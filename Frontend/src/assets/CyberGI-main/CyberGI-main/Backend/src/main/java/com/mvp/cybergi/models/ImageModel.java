package com.mvp.cybergi.models;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
@Data
public class ImageModel {
    private String name;
    private MultipartFile file;
    private Long userId;

@Data
    public static class Avatar extends ImageModel {


        private String name;
        private MultipartFile file;
        private Long userId;
    }
}

