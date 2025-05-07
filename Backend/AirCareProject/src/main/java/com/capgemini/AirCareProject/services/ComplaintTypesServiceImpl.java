package com.capgemini.AirCareProject.services;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capgemini.AirCareProject.entities.ComplaintTypes;

import com.capgemini.AirCareProject.exceptions.ComplaintTypeNotFoundException;

import com.capgemini.AirCareProject.repositories.ComplaintTypesRepo;

@Service
public class ComplaintTypesServiceImpl implements ComplaintTypesService {
	
private final ComplaintTypesRepo repository;
    
    @Autowired
    public ComplaintTypesServiceImpl(ComplaintTypesRepo repository) {
        this.repository = repository;
    }
    
    @Override
    public List<ComplaintTypes> getAllComplaintTypes() {
        return repository.findAll();
    }
    
    @Override
    public ComplaintTypes getComplaintTypeById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ComplaintTypeNotFoundException("ComplaintType not found with ID: " + id));
    }
    
    @Override
    public ComplaintTypes createComplaintType(ComplaintTypes complaintType) {
        return repository.save(complaintType);
    }
    
    @Override
    public ComplaintTypes updateComplaintType(Long id, ComplaintTypes complaintType) {
        ComplaintTypes existing = repository.findById(id)
                .orElseThrow(() -> new ComplaintTypeNotFoundException("ComplaintType not found with ID: " + id));
        
        existing.setComplaintType(complaintType.getComplaintType());
        existing.setSeverity(complaintType.getSeverity());
        
        return repository.save(existing);
    }
    
    @Override
	public ComplaintTypes patchComplaintType(Long id, ComplaintTypes patch) {
		ComplaintTypes existing = repository.findById(id)
				.orElseThrow(() -> new ComplaintTypeNotFoundException("ComplaintType not found with id:" + id));
		
		if(patch.getComplaintType() != null) {
			existing.setComplaintType(patch.getComplaintType());
		}
		
		if(patch.getSeverity() != null) {
			existing.setSeverity(patch.getSeverity());
		}
		
		return repository.save(existing);	}
    
    @Override
    public void deleteComplaintType(Long id) {
        if (!repository.existsById(id)) {
            throw new ComplaintTypeNotFoundException("Cannot delete. ComplaintType not found with ID: " + id);
        }
        repository.deleteById(id);
    }
}
