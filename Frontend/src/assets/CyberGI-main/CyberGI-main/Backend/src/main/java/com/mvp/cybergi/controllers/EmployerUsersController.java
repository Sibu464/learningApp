package com.mvp.cybergi.controllers;

import com.mvp.cybergi.Payload.request.EmployeeUserRequest;
import com.mvp.cybergi.entity.EmployersUsers;
import com.mvp.cybergi.entity.User;
import com.mvp.cybergi.service.EmployersUserService;
import com.mvp.cybergi.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true", maxAge = 3600)
@RequestMapping("/api/v1/empusers")
public class EmployerUsersController {

    private final EmployersUserService employersUsersService;
    private final UserDetailsServiceImpl userDetailsService;

    @Autowired
    public EmployerUsersController(EmployersUserService employersUsersService, UserDetailsServiceImpl userDetailsService) {
        this.employersUsersService = employersUsersService;
        this.userDetailsService = userDetailsService;
    }

    @GetMapping("/getUserId")
    public ResponseEntity<Long> getUserId(@RequestParam String username) {
        Long userId = userDetailsService.getUserIdByUserName(username);
        return ResponseEntity.ok(userId);
    }

    @GetMapping("/all")
    public ResponseEntity<List<EmployersUsers>> getAllEmployersUsers() {
        List<EmployersUsers> employersUsersList = employersUsersService.findAll();
        return ResponseEntity.ok(employersUsersList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployersUsers> getEmployersUsersById(@PathVariable Long id) {
        EmployersUsers employersUsers = employersUsersService.findById(id);
        return ResponseEntity.ok(employersUsers);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployersUsers(@PathVariable Long id) {
        employersUsersService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/employees/{employerId}")
    public ResponseEntity<List<User>> getEmployeesByEmployerId(@PathVariable Long employerId) {
        List<User> employees = employersUsersService.findEmployeesByEmployerId(employerId);
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/employer/{employeeId}")
    public ResponseEntity<List<User>> getEmployerByEmployeeId(@PathVariable Long employeeId) {
        List<User> employers = employersUsersService.findEmployerByEmployeeId(employeeId);
        return ResponseEntity.ok(employers);
    }

    @PostMapping("/save")
    public ResponseEntity<EmployersUsers> saveEmployersUsers(@RequestBody EmployeeUserRequest request) {
        EmployersUsers savedEmployersUsers = employersUsersService.save(request);
        return ResponseEntity.ok(savedEmployersUsers);
    }
}
