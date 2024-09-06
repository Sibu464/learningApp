package com.mvp.cybergi.repository;

import com.mvp.cybergi.entity.EmployersUsers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployersUsersRepo  extends JpaRepository<EmployersUsers, Long> {
    List<EmployersUsers> findByEmployerId(Long employerId);

    List<EmployersUsers> findByEmployeeId(Long employeeId);

    //  query method to find employerId by userId (employeeId)
//    @Query("SELECT eu.employer FROM EmployersUsers eu WHERE eu.id = :employer")
//    Long findEmployerIdByUserId(@Param("employer") Long userId);

}
