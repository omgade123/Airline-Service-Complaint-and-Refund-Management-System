package com.capgemini.AirCareProject.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capgemini.AirCareProject.entities.Complaints;
import com.capgemini.AirCareProject.exceptions.ComplaintNotFoundException;
import com.capgemini.AirCareProject.repositories.ComplaintsRepo;

@Service
public class ComplaintsServiceImpl implements ComplaintsService  {
	 private final ComplaintsRepo repository;
	 
	 @Autowired
	 public ComplaintsServiceImpl(ComplaintsRepo repository) {
	        this.repository = repository;
	    }
	@Override
	public List<Complaints> getAllComplaints() {
		 return repository.findAll();
	}

	@Override
	public Complaints getComplaintById(Long id) {
		return repository.findById(id)
                .orElseThrow(() -> new ComplaintNotFoundException("Complaint not found with ID: " + id));
	}

	@Override
	public Complaints createComplaint(Complaints complaints) {
		 return repository.save(complaints);
	}


	@Override
	public Complaints patchComplaint(Long id, Complaints complaint) {
		   Complaints existing = repository.findById(id)
		            .orElseThrow(() -> new ComplaintNotFoundException("Complaint not found with ID: " + id));

		    if (complaint.getUserID() != null) {
		        existing.setUserID(complaint.getUserID());
		    }
		    if (complaint.getDeptID() != null) {
		        existing.setDeptID(complaint.getDeptID());
		    }
		    if (complaint.getCtID() != null) {
		        existing.setCtID(complaint.getCtID());
		    }
		    if (complaint.getDescription() != null) {
		        existing.setDescription(complaint.getDescription());
		    }
		    if (complaint.getDateFiled() != null) {
		        existing.setDateFiled(complaint.getDateFiled());
		    }
		    if (complaint.getStatus() != null) {
		        existing.setStatus(complaint.getStatus());
		    }

		    return repository.save(existing);
		}
	
	@Override
	public List<Complaints> getComplaintsByUser(Long userId) {
		 return repository.findByUserID(userId);
	}
	@Override
	public List<Complaints> getComplaintsByDepartment(String deptId) {
		return repository.findByDeptID(deptId);
	}

	}


