package com.capgemini.AirCareProject.entities;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class Users {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)

	private Long userID;
	
	@NotBlank(message = "Username is mandatory")

	private String username;
	@NotBlank(message = "Password is mandatory")
	private String password;
	@NotBlank(message = "Email is mandatory")
	private String email;
	@NotNull(message = "Mobile number can not be null")
	private Long mobile;

	@NotBlank(message = "User type is mandatory")
	private String userType;

	

	public Users() {
		super();
		
	}




	public Users(Long userID,String username, String password, String email, Long mobile,String userType) {
		super();
		this.userID = userID;
		this.username = username;
		this.password = password;
		this.email = email;
		this.mobile = mobile;
		this.userType = userType;
	}

	


	public Long getUserID() {
		return userID;
	}




	public void setUserID(Long userID) {
		this.userID = userID;
	}




	public String getUsername() {
		return username;
	}




	public void setUsername(String username) {
		this.username = username;
	}




	public String getPassword() {
		return password;
	}




	public void setPassword(String password) {
		this.password = password;
	}




	public String getEmail() {
		return email;
	}




	public void setEmail(String email) {
		this.email = email;
	}




	public Long getMobile() {
		return mobile;
	}




	public void setMobile(Long mobile) {
		this.mobile = mobile;
	}




	public String getUserType() {
		return userType;
	}




	public void setUserType(String userType) {
		this.userType = userType;
	}




	@Override
	public String toString() {
		return "Users [userID=" + userID + ", username=" + username + ", password=" + password + ", email=" + email
				+ ", mobile=" + mobile + ", userType=" + userType + "]";
	}
	
	
	
	
}
