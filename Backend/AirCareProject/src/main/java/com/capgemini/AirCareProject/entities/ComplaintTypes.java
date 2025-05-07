package com.capgemini.AirCareProject.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
public class ComplaintTypes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CTID")
    private Long ctID;

    @NotBlank(message = "Complaint type is mandatory")
    private String complaintType;

    @NotBlank(message = "Severity is mandatory")
    private String severity;

    public ComplaintTypes() {}

    public ComplaintTypes(Long ctID, String complaintType, String severity) {
        this.ctID = ctID;
        this.complaintType = complaintType;
        this.severity = severity;
    }

    @JsonProperty("CTID")
    public Long getCTID() {
        return ctID;
    }

    public void setCTID(Long ctID) {
        this.ctID = ctID;
    }

    public String getComplaintType() {
        return complaintType;
    }

    public void setComplaintType(String complaintType) {
        this.complaintType = complaintType;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    @Override
    public String toString() {
        return "ComplaintTypes [CTID=" + ctID + ", complaintType=" + complaintType + ", severity=" + severity + "]";
    }
}
