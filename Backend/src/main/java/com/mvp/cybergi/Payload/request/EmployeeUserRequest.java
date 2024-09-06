package com.mvp.cybergi.Payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class EmployeeUserRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private Long employee_id;

    @NotBlank
    @Size(max = 50)
    private Long employer_id;

    public @NotBlank @Size(min = 3, max = 20) Long getModule_id() {
        return employee_id;
    }

    public void setModule_id(@NotBlank @Size(min = 3, max = 20) Long employee_id) {
        this.employee_id = employee_id;
    }

    public @NotBlank @Size(max = 50) Long getEmployer_id() {
        return employer_id;
    }
    public @NotBlank @Size(max = 50) Long getEmployee_id() {
        return employee_id;
    }

    public void setEmployer_id(@NotBlank @Size(max = 50) Long employer_id) {
        this.employer_id = employer_id;
    }
    public void setEmployee_id(@NotBlank @Size(max = 50) Long employee_id) {
        this.employee_id = employee_id;
    }
}
