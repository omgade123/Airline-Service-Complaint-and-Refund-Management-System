package com.capgemini.AirCareProject.services;

import java.util.List;

import com.capgemini.AirCareProject.entities.Complaints;

public interface ComplaintsService {
	  List<Complaints> getAllComplaints();
	    Complaints getComplaintById(Long id);
	    Complaints createComplaint(Complaints complaints);
	//    Complaints updateComplaint(Long id, Complaints complaints);
	    Complaints patchComplaint(Long id, Complaints complaints);
	 //   void deleteComplaint(Long id);
	    
	    List<Complaints> getComplaintsByUser(Long userId);
	    List<Complaints> getComplaintsByDepartment(String deptId);
}
