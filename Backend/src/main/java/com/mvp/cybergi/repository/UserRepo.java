package com.mvp.cybergi.repository;

import com.mvp.cybergi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

//  Method to check if a user with given username exists in database
    Boolean existsByUsername(String username);

//   Method to check if user with given email exists in database
   Boolean existsByEmail(String email);

   ;
}
