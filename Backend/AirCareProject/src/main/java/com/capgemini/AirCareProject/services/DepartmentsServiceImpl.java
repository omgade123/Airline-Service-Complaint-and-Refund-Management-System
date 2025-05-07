package com.capgemini.AirCareProject.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capgemini.AirCareProject.entities.Departments;
import com.capgemini.AirCareProject.exceptions.DepartmentNotFoundException;
import com.capgemini.AirCareProject.repositories.DepartmentsRepo;

@Service
public class DepartmentsServiceImpl implements DepartmentsService {
	
	private final DepartmentsRepo repository;
	
	@Autowired
	public DepartmentsServiceImpl (DepartmentsRepo repository) {
		this.repository = repository;
	}

	@Override
	public List<Departments> getAllDepartments() {
		return repository.findAll();
	}

	@Override
	public Departments getDepartmentById(String id) {
		return repository.findById(id)
				.orElseThrow(() -> new DepartmentNotFoundException("Department not found with id:" + id));
		
	}

	@Override
	public Departments updateDepartment(String id, Departments updated) {
		Departments existing = repository.findById(id)
				.orElseThrow(() -> new DepartmentNotFoundException("Department not found with id:" + id));
		existing.setName(updated.getName());
		existing.setContact(updated.getContact());
		return repository.save(existing);
	}

	@Override
	public Departments patchDepartment(String id, Departments patch) {
		Departments existing = repository.findById(id)
				.orElseThrow(() -> new DepartmentNotFoundException("Department not found with id:" + id));
		
		if(patch.getName() != null) {
			existing.setName(patch.getName());
		}
		
		if(patch.getContact() != null) {
			existing.setContact(patch.getContact());
		}
		
		return repository.save(existing);	}

}
