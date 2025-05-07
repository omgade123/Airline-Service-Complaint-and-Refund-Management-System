package com.capgemini.AirCareProject.entities;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Departments {

    @Id
    @JsonProperty("DeptID")
    private String deptID;


    @NotBlank(message = "Name is mandatory")
    @JsonProperty("Name")
    private String name;


    @NotBlank(message = "Contact is mandatory")
    @JsonProperty("Contact")
    private String contact;

    public Departments() {
        super();
    }

    public Departments(String deptID, String name, String contact) {
        this.deptID = deptID;
        this.name = name;
        this.contact = contact;
    }

    public String getDeptID() {
        return deptID;
    }

    public void setDeptID(String deptID) {
        this.deptID = deptID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    @Override
    public String toString() {
        return "Departments [DeptID=" + deptID + ", Name=" + name + ", Contact=" + contact + "]";
    }
}
