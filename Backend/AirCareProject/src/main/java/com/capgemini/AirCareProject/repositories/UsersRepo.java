package com.capgemini.AirCareProject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;


import com.capgemini.AirCareProject.entities.Users;

public interface UsersRepo extends JpaRepository <Users, Long>{

}
