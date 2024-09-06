package com.mvp.cybergi.controllers;


import com.mvp.cybergi.Payload.request.LoginRequest;
import com.mvp.cybergi.Payload.request.SignUpRequest;
import com.mvp.cybergi.Payload.response.MessageResponse;
import com.mvp.cybergi.Payload.response.UserInfoResponse;
import com.mvp.cybergi.entity.ERole;
import com.mvp.cybergi.entity.Role;
import com.mvp.cybergi.entity.User;
import com.mvp.cybergi.repository.RoleRepo;
import com.mvp.cybergi.repository.UserRepo;
import com.mvp.cybergi.security.jwt.JwtUtils;
import com.mvp.cybergi.security.services.UserDetailsImpl;
import com.mvp.cybergi.service.EmailSenderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@CrossOrigin(origins = "http://localhost:4200",allowCredentials ="true",maxAge = 3600)
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private  EmailSenderService emailService=new EmailSenderService();
    @Autowired
    public AuthController(EmailSenderService emailSenderService) {
        this.emailService = emailSenderService;
    }
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepo userRepo;

    @Autowired
    RoleRepo roleRepo;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);


        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
//        System.out.println("Testing this thing "+jwtCookie.toString());
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new UserInfoResponse(userDetails.getId(),
                        userDetails.getUsername(),
                        userDetails.getEmail(),
                        roles,extractTokenFromCookie(jwtCookie.toString())));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest){

        if (userRepo.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }
        if (userRepo.existsByEmail(signUpRequest.getEmail())){
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        //Create new user account
        User user = new User(signUpRequest.getUsername(),
                    signUpRequest.getEmail(),
                    encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null){

            Role userRole = roleRepo.findByName(ERole.ROLE_EMPLOYEE


                    )
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        }else {
            strRoles.forEach(role ->{
                switch (role.toLowerCase()){
                    case"admin":
                        Role adminRole = roleRepo.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "employer":
                        Role employerRole = roleRepo.findByName(ERole.ROLE_EMPLOYER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(employerRole);

                        break;
                    default:

                        Role employeeRole = roleRepo.findByName(ERole.ROLE_EMPLOYEE)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                                roles.add(employeeRole);

                }
            });
        }
        user.setRoles(roles);
        String welcomeMessage="username: "+signUpRequest.getUsername()+"\n"+"password: "+signUpRequest.getPassword();
        emailService.sendSimpleMessage(signUpRequest.getEmail(), "CyberGi Login details", welcomeMessage);


        userRepo.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser(){
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new MessageResponse("You've been signed out!"));
    }

    public static String extractTokenFromCookie(String cookieString) {
        // Split the cookie string by semicolon to get individual cookie attributes
        String[] cookieAttributes = cookieString.split(";");

        // Iterate over each attribute to find the one containing the JWT token
        for (String attribute : cookieAttributes) {
            attribute = attribute.trim(); // Trim any leading or trailing whitespace

            // Check if the attribute starts with the cookie name followed by '='
            if (attribute.startsWith("cybergi=")) {
                // Extract the JWT token part by splitting at '=' and taking the second part
                String token = attribute.substring("cybergi=".length());
                return token;
            }
        }

        return null; // Return null if token is not found
    }

}
