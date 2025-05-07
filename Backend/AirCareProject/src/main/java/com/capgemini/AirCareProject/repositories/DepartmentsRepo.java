package com.capgemini.AirCareProject.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capgemini.AirCareProject.entities.Departments;

public interface DepartmentsRepo extends JpaRepository<Departments, String> {
		
}
