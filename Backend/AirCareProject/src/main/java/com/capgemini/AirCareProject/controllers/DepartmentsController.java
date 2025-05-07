package com.capgemini.AirCareProject.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capgemini.AirCareProject.entities.Departments;

import com.capgemini.AirCareProject.services.DepartmentsService;



@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/departments")

public class DepartmentsController {
	private final DepartmentsService service;
	
	@Autowired
    public DepartmentsController(DepartmentsService service) {
        this.service = service;
    }
	
	@GetMapping
    public ResponseEntity<List<Departments>> getAllDepartments() {
        List<Departments> departments = service.getAllDepartments();
        return ResponseEntity.status(HttpStatus.OK).body(departments);
    }
	
	@GetMapping("/{id}")
    public ResponseEntity<Departments> getDepartmentById(@PathVariable String id) {
        Departments departments = service.getDepartmentById(id);
        return ResponseEntity.status(HttpStatus.OK).body(departments);
    }
    
	@PutMapping("/{id}")
    public ResponseEntity<Departments> updateDepartment(@PathVariable String id, @RequestBody Departments newDepartment) {
        Departments updated = service.updateDepartment(id, newDepartment);
        return ResponseEntity.status(HttpStatus.OK).body(updated);
    }
	
	@PatchMapping("/{id}")
	public ResponseEntity<Departments> patchDepartment(@PathVariable String id, @RequestBody Departments patch) {
		Departments updated = service.patchDepartment(id, patch);
		return ResponseEntity.status(HttpStatus.OK).body(updated);
	}
}
