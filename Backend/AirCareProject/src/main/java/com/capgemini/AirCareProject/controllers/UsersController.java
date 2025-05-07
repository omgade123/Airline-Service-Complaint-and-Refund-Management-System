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

import com.capgemini.AirCareProject.entities.Users;
import com.capgemini.AirCareProject.services.UsersService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UsersController {
	
	private final UsersService service;
	
	@Autowired
    public UsersController(UsersService service) {
        this.service = service;
    }
	
	@GetMapping
    public ResponseEntity<List<Users>> getAllUsers() {
        List<Users> users = service.getAllUsers();
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }
    
	@GetMapping("/{id}")
    public ResponseEntity<Users> getUser(@PathVariable Long id) {
        Users users = service.getUserById(id);
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }
	
	@PostMapping
    public ResponseEntity<Users> createUser(@RequestBody Users user) {
        Users saved = service.createUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).location(URI.create("/api/users/" + saved.getUserID()))
        		.body(saved);
    }
    
	@PutMapping("/{id}")
    public ResponseEntity<Users> updateUser(@PathVariable Long id, @RequestBody Users newUser) {
        Users updated = service.updateUser(id, newUser);
        return ResponseEntity.status(HttpStatus.OK).body(updated);
    }
	
	@PatchMapping("/{id}")
	public ResponseEntity<Users> patchUser(@PathVariable Long id, @RequestBody Users patch) {
		Users updated = service.patchUser(id, patch);
		return ResponseEntity.status(HttpStatus.OK).body(updated);
	}
    
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
		service.deleteUser(id);
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}
}
