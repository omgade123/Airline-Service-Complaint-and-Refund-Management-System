package com.capgemini.AirCareProject.services;

import com.capgemini.AirCareProject.entities.ComplaintTypes;


import java.util.List;


public interface ComplaintTypesService {
 List<ComplaintTypes> getAllComplaintTypes();
 ComplaintTypes getComplaintTypeById(Long id);
 ComplaintTypes createComplaintType(ComplaintTypes complaintType);
 ComplaintTypes updateComplaintType(Long id, ComplaintTypes complaintType);
 ComplaintTypes patchComplaintType(Long id, ComplaintTypes complaintType);
 void deleteComplaintType(Long id);
}