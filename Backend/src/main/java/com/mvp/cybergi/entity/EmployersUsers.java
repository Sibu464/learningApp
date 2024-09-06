package com.mvp.cybergi.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "employersEmployees")
public class EmployersUsers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) // Set to LAZY to avoid deep nesting issues
    @JoinColumn(name = "employer_id_fk")
    @JsonManagedReference
    private User employer;

    @ManyToOne(fetch = FetchType.LAZY) // Set to LAZY to avoid deep nesting issues
    @JoinColumn(name = "employee_id_fk")
    @JsonBackReference
    private User employee;

    // Default constructor
    public EmployersUsers() {}

    // Parameterized constructor
    public EmployersUsers(User employer, User employee) {
        this.employer = employer;
        this.employee = employee;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getEmployer() {
        return employer;
    }

    public void setEmployer(User employer) {
        this.employer = employer;
    }

    public User getEmployee() {
        return employee;
    }

    public void setEmployee(User employee) {
        this.employee = employee;
    }
}
