package com.mvp.cybergi.Payload.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SubscriptionRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private Long module_id;

    @NotBlank
    @Size(max = 50)
    private Long employer_id;

    public @NotBlank @Size(min = 3, max = 20) Long getModule_id() {
        return module_id;
    }

    public void setModule_id(@NotBlank @Size(min = 3, max = 20) Long module_id) {
        this.module_id = module_id;
    }

    public @NotBlank @Size(max = 50) Long getEmployer_id() {
        return employer_id;
    }

    public void setEmployer_id(@NotBlank @Size(max = 50) Long employer_id) {
        this.employer_id = employer_id;
    }
}
