package com.mvp.cybergi.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mvp.cybergi.entity.quiz.Mod;
import jakarta.persistence.*;
import lombok.Setter;

@Entity
@Table(name="subscribedModules")
public class SubscribedModules {
   @Setter
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @ManyToOne
   @JoinColumn(name = "module_id_fk")
   @JsonManagedReference
   private Mod module;

   private Boolean isCompleted = false;

   @ManyToOne
   @JoinColumn(name = "employer_id_fk")
   @JsonBackReference
   private User employer; //role in from the role table has to be employer
   public void setEmployer(User employer) {
      // Ensure employer is not null before setting properties
      if (employer != null) {
         this.employer = employer;
      } else {
         // Handle null employer case if needed
         throw new IllegalArgumentException("Employer cannot be null");
      }
   }
   public Long getId() {
      return id;
   }
   // Constructors
   public SubscribedModules() {
   }

   public SubscribedModules(User employer, Mod module) {

      this.employer=employer;
      this.module = module;
   }
//    public SubscribedModules(Long employer_id, Long module_id){
//      this.em
//      this.employer.setId(employer_id);
//      this.module.setId(module_id);
//    }

    public Mod getModule() {
      return module;
   }

   public void setModule(Mod module) {
      this.module = module;
   }

   public User getEmployer() {
      return employer;
   }


}
