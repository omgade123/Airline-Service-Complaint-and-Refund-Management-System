package com.capgemini.AirCareProject.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capgemini.AirCareProject.entities.Users;
import com.capgemini.AirCareProject.exceptions.UserNotFoundException;
import com.capgemini.AirCareProject.repositories.UsersRepo;

@Service
public class UsersServiceImpl implements UsersService {
	
	private final UsersRepo repository;
	
	@Autowired
	public UsersServiceImpl(UsersRepo repository) {
		this.repository = repository;
	}

	@Override
	public List<Users> getAllUsers() {
		return repository.findAll();
	}

	@Override
	public Users getUserById(Long id) {
		return repository.findById(id)
				.orElseThrow(() -> new UserNotFoundException("User not found with:" +  id));
	}

	@Override
	public Users createUser(Users user) {
		return repository.save(user);
	}

	@Override
	public Users updateUser(Long id, Users user) {
		Users existing = repository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + id));
        // Update fields
        existing.setUsername(user.getUsername());
        existing.setPassword(user.getPassword());
        existing.setEmail(user.getEmail());
        existing.setMobile(user.getMobile());
        existing.setUserType(user.getUserType());
        return repository.save(existing);
	}

	@Override
	public Users patchUser(Long id, Users patch) {
		Users existing = repository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + id));
		
		if(patch.getUsername() != null) {
			existing.setUsername(patch.getUsername());
		}
		
		if(patch.getPassword() != null) {
			existing.setPassword(patch.getPassword());
		}
		
		if(patch.getEmail() !=null) {
			existing.setEmail(patch.getEmail());
		}
		
		if(patch.getEmail() != null) {
			existing.setEmail(patch.getEmail());
		}
		
		if(patch.getPassword() != null) {
			existing.setPassword(patch.getPassword());
		}
		
	    return repository.save(existing);
	}

	@Override
	public void deleteUser(Long id) {
		
		if (!repository.existsById(id)) {
            throw new UserNotFoundException("Cannot delete. User not found with ID: " + id);
        }
        repository.deleteById(id);
    }
	}


