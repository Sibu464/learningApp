package com.mvp.cybergi.repository;

import com.mvp.cybergi.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ImageRepository extends JpaRepository<Image, UUID> {

    Optional<Image> findByName(String name);
    List<Image> findByUserId(Long userId);
    Image findFirstByUserId(Long userId);
}
