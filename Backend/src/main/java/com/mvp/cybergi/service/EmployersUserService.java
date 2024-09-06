package com.mvp.cybergi.service;

import com.mvp.cybergi.Payload.request.EmployeeUserRequest;
import com.mvp.cybergi.entity.EmployersUsers;
import com.mvp.cybergi.entity.User;
import com.mvp.cybergi.repository.EmployersUsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployersUserService {
    private  EmployersUsersRepo employersUsersRepository;

    @Autowired
    public void EmployersUsersService(EmployersUsersRepo employersUsersRepository) {
        this.employersUsersRepository = employersUsersRepository;
    }

    public List<EmployersUsers> findAll() {
        return employersUsersRepository.findAll();
    }

    public EmployersUsers findById(Long id) {
        return employersUsersRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("EmployersUsers not found"));
    }

    public EmployersUsers saveEmployersUsers(User employer, User employee) {
        EmployersUsers employersUsers = new EmployersUsers(employer, employee);
        return employersUsersRepository.save(employersUsers);
    }

    public List<User> findEmployeesByEmployerId(Long employerId) {
        List<EmployersUsers> employersUsersList = employersUsersRepository.findByEmployerId(employerId);

        // Extract employees from employersUsersList
        return employersUsersList.stream()
                .map(EmployersUsers::getEmployee)
                .collect(Collectors.toList());
    }

    public List<User> findEmployerByEmployeeId(Long employeeId) {
        List<EmployersUsers> employersUsersList = employersUsersRepository.findByEmployeeId(employeeId);

        // Extract employer from employersUsersList
        return employersUsersList.stream()
                .map(EmployersUsers::getEmployer)
                .collect(Collectors.toList());
    }



    public EmployersUsers save(EmployeeUserRequest empRequest) {
        User employer=new User();
        User employee=new User();
        employer.setId(empRequest.getEmployer_id());
        employee.setId(empRequest.getEmployee_id());
        EmployersUsers employersUsers = new EmployersUsers(employer,employee);
        return employersUsersRepository.save(employersUsers);
    }
    public void deleteById(Long id) {
        employersUsersRepository.deleteById(id);
    }

//    public Long findEmployerIdByEmployeeId(Long employeeId) {
//        return employersUsersRepository.findEmployerIdByUserId(employeeId);
//    }
}
