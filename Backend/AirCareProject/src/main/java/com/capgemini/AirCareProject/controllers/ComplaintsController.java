package com.capgemini.AirCareProject.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capgemini.AirCareProject.entities.Complaints;
import com.capgemini.AirCareProject.services.ComplaintsService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/complaints")
public class ComplaintsController {

	private final ComplaintsService complaintsService;
	
	@Autowired
    public ComplaintsController(ComplaintsService complaintsService) {
        this.complaintsService = complaintsService;
    }
	
	@GetMapping
    public ResponseEntity<List<Complaints>> getAllComplaints() {
        List<Complaints> complaints = complaintsService.getAllComplaints();
        return ResponseEntity.status(HttpStatus.OK).body(complaints);
    }
	
	@GetMapping("/{id}")
    public ResponseEntity<Complaints> getComplaintById(@PathVariable Long id) {
        Complaints complaints = complaintsService.getComplaintById(id);
        return ResponseEntity.status(HttpStatus.OK).body(complaints);
    }
	
	 @GetMapping("/users/{userId}")
	    public ResponseEntity<List<Complaints>> getComplaintsByUser(@PathVariable Long userId) {
	        List<Complaints> complaints = complaintsService.getComplaintsByUser(userId);
	        return ResponseEntity.status(HttpStatus.OK).body(complaints);
	 }
	 
	 @GetMapping("/departments/{deptId}")
	    public ResponseEntity<List<Complaints>> getComplaintsByDepartment(@PathVariable String deptId) {
	        List<Complaints> complaints = complaintsService.getComplaintsByDepartment(deptId);
	        return ResponseEntity.status(HttpStatus.OK).body(complaints);
	    }
	 
	 
	 
	 
	 @PostMapping
	    public ResponseEntity<Complaints> createComplaint(@RequestBody Complaints complaints) {
	        Complaints saved = complaintsService.createComplaint(complaints);
	    
	        return ResponseEntity.status(HttpStatus.CREATED).location(URI.create("/api/complaints/" + saved.getCtID()))
	        		.body(saved);
	    }
	 
	 @PatchMapping("/{id}")
	 public ResponseEntity<Complaints> patchComplaint(@PathVariable Long id, @RequestBody Complaints complaints){
		 Complaints complaint = complaintsService.getComplaintById(id);
		 if(complaint == null) {
			 return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		 }
		 
		 complaint.setStatus(complaints.getStatus());
		 Complaints updatedComplaints = complaintsService.patchComplaint(id, complaints);
		return ResponseEntity.status(HttpStatus.OK).body(updatedComplaints);
		 
	 }
}
