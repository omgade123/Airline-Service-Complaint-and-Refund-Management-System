package com.capgemini.AirCareProject.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Complaints {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long CID;
 
 
 private Long ctID;

 private Long userID;
 
 @NotBlank(message = "Department ID is mandatory")
 private String deptID;
 
 @NotBlank(message = "Complaint type ID is mandatory")

 
 @NotBlank(message = "Description is mandatory")
 private String description;
 
 private LocalDate dateFiled;
 
 @NotBlank(message = "Status is mandatory")
 private String status;

 // Constructors, getters, setters
 public Complaints() {}

public Complaints(Long CID ,Long ctID, Long userID,String deptID, String description,
		LocalDate dateFiled,String status) {
	super();
	this.CID = CID;
	this.ctID = ctID;
	this.userID = userID;
	this.deptID = deptID;
	this.description = description;
	this.dateFiled = dateFiled;
	this.status = status;
}


@JsonProperty("CID")
public Long getCID() {
	return CID;
}

public void setCID(Long cID) {
	CID = cID;
}

@JsonProperty("CTID")
public Long getCtID() {
	return ctID;
}

public void setCtID(Long ctID) {
	this.ctID = ctID;
}

@JsonProperty("UserID")
public Long getUserID() {
	return userID;
}

public void setUserID(Long userID) {
	this.userID = userID;
}

@JsonProperty("DeptID")
public String getDeptID() {
	return deptID;
}

public void setDeptID(String deptID) {
	this.deptID = deptID;
}

@JsonProperty("Description")
public String getDescription() {
	return description;
}

public void setDescription(String description) {
	this.description = description;
}

@JsonProperty("DateFiled")
public LocalDate getDateFiled() {
	return dateFiled;
}

public void setDateFiled(LocalDate dateFiled) {
	this.dateFiled = dateFiled;
}

@JsonProperty("Status")
public String getStatus() {
	return status;
}

public void setStatus(String status) {
	this.status = status;
}

@Override
public String toString() {
	return "Complaints [CID=" + CID + ",ctID=" + ctID + ", userID=" + userID + ", deptID=" + deptID + ", description=" + description
			+ ", dateFiled=" + dateFiled + ", status=" + status + "]";
}
 
 

 
}