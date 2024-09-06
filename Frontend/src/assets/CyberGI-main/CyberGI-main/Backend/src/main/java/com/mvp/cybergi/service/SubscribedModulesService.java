package com.mvp.cybergi.service;

import com.mvp.cybergi.Payload.request.SubscriptionRequest;
import com.mvp.cybergi.entity.SubscribedModules;
import com.mvp.cybergi.entity.User;
import com.mvp.cybergi.entity.quiz.Mod;
import com.mvp.cybergi.repository.SubscribedModulesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class SubscribedModulesService {

    private final SubscribedModulesRepo subscribedModulesRepository;

    @Autowired
    public SubscribedModulesService(SubscribedModulesRepo subscribedModulesRepository) {
        this.subscribedModulesRepository = subscribedModulesRepository;
    }

    // Example method to retrieve all subscribed modules
    public List<SubscribedModules> getAllSubscribedModules() {
        return subscribedModulesRepository.findAll();
    }


    public SubscribedModules saveSubscribedModule(SubscriptionRequest subscribedModule) {
        User usr=new User();
        Mod mod=new Mod();
        mod.setId(subscribedModule.getModule_id());
        usr.setId(subscribedModule.getEmployer_id());
        SubscribedModules subObj= new SubscribedModules(usr,mod);
        return subscribedModulesRepository.save(subObj);

    }

    public List<SubscribedModules> getSubscribedModulesByEmployerId(Long employerId) {
        return subscribedModulesRepository.findByEmployerId(employerId);
    }
    public List<SubscribedModules> getCompletedModules() {
        return subscribedModulesRepository.findByIsCompleted(true);
    }

}
