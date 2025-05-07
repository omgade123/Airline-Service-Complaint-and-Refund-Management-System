package com.capgemini.AirCareProject.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capgemini.AirCareProject.entities.Complaints;

public interface ComplaintsRepo extends JpaRepository <Complaints, Long>{

	List<Complaints> findByUserID(Long userId);

	List<Complaints> findByDeptID(String deptId);

}


