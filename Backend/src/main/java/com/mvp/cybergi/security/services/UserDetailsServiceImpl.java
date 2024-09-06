package com.mvp.cybergi.security.services;


import com.mvp.cybergi.entity.User;
import com.mvp.cybergi.repository.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepo userRepo;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username ));

        return UserDetailsImpl.build(user);
    }

    public Long getUserIdByUserName(String username){
        User user=userRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username ));
        return user.getId();
    }

    public Long getByUserId(Long userId) {
        User user= userRepo.findById(userId).orElseThrow(()-> new  UsernameNotFoundException("User Id not found: " + userId));
        return user.getId();
    }
}
