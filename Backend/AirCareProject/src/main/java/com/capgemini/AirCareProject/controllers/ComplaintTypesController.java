package com.capgemini.AirCareProject.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capgemini.AirCareProject.entities.ComplaintTypes;

import com.capgemini.AirCareProject.services.ComplaintTypesService;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/complaintTypes")
public class ComplaintTypesController {
	 private final ComplaintTypesService service;
	
	 @Autowired
	    public ComplaintTypesController(ComplaintTypesService service) {
	        this.service = service;
	    }
	 
	 @GetMapping
	    public ResponseEntity<List<ComplaintTypes>> getAllComplaintTypes() {
	        List<ComplaintTypes> complaintTypes = service.getAllComplaintTypes();
	        return ResponseEntity.status(HttpStatus.OK).body(complaintTypes);
	    }
	 
	 @GetMapping("/{id}")
	    public ResponseEntity<ComplaintTypes> getComplaintType(@PathVariable Long id) {
	        ComplaintTypes complaintTypes = service.getComplaintTypeById(id);
	        return ResponseEntity.status(HttpStatus.OK).body(complaintTypes);
	    }
	 
	 @PostMapping
	    public ResponseEntity<ComplaintTypes> createComplaintType(@RequestBody ComplaintTypes complaintType) {
	        ComplaintTypes saved = service.createComplaintType(complaintType);
	        return ResponseEntity
	                .created(URI.create("/api/complaintTypes/" + saved.getCTID()))
	                .body(saved);
	    }
	 
	 @PutMapping("/{id}")
	    public ResponseEntity<ComplaintTypes> updateComplaintType(@PathVariable Long id, @RequestBody ComplaintTypes newComplaintType) {
		 ComplaintTypes updated = service.updateComplaintType(id, newComplaintType);
	        return ResponseEntity.status(HttpStatus.OK).body(updated);
	    }
	 
	 @PatchMapping("/{id}")
		public ResponseEntity<ComplaintTypes> patchComplaintType(@PathVariable Long id, @RequestBody ComplaintTypes patch) {
		 ComplaintTypes updated = service.patchComplaintType(id, patch);
			return ResponseEntity.status(HttpStatus.OK).body(updated);
		}
	 
	 @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteComplaintType(@PathVariable Long id) {
	        service.deleteComplaintType(id);
	        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	    }
}
