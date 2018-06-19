package com.faiyt.pennywise.services;

import com.faiyt.pennywise.repositories.LinkedInstitutions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LinkedInstitutionService {
    private LinkedInstitutions institutions;


    @Autowired
    public LinkedInstitutionService(LinkedInstitutions institutions) {
        this.institutions = institutions;
    }

    public LinkedInstitutions getInstitutions() {
        return institutions;
    }
}
