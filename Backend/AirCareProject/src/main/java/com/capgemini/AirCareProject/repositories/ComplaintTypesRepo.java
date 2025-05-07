package com.capgemini.AirCareProject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capgemini.AirCareProject.entities.ComplaintTypes;

public interface ComplaintTypesRepo extends JpaRepository<ComplaintTypes , Long> {

}
