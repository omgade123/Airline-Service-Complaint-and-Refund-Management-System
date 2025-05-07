package com.capgemini.AirCareProject.services;

import java.util.List;

import com.capgemini.AirCareProject.entities.Departments;

public interface DepartmentsService {
			List<Departments> getAllDepartments();
			
			Departments getDepartmentById(String id);
			
			Departments updateDepartment(String id, Departments departments);
			
			Departments patchDepartment(String id, Departments departments);
			

}
