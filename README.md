# Airline-Service-Complaint-and-Refund-Management-System

## Description
This project is an **Airline-Service-Complaint-and-Refund-Management-System**, designed to manage incoming complaints, refund requests, and other airline-related services. It features an interactive, user-friendly interface and is built using various software development tools.

---

## Technologies Used
- **Frontend**: 
  - HTML
  - CSS
  - JavaScript
  - Chart.js
- **Backend**: 
  - Java
  - Spring Boot
  - REST APIs
- **Database**: 
  - MySQL

---

## Prerequisites
Before you begin, make sure you have the following installed:

- **Eclipse IDE** (Enterprise Edition recommended for Java backend)
- **MySQL Workbench** (for the database)
- **VS Code** (for frontend development)
- **Live Server Extension for VS Code** (for running HTML files locally)

---

## Step 1: Backend Setup Instructions

1. **Import the Backend Project into Eclipse**:
   - Open **Eclipse IDE** and click on **File > Import**.
   - Choose **Existing Maven Projects**, then browse and select the `Backend/AirCareProject` folder in your project directory.
   - Import the project into Eclipse.

2. **Configure Server Port**:
   - By default, the backend will run on **localhost:8181**. You can use this port or change it if needed.
   - To change the port, you can modify the `application.properties` file in Eclipse, but this step is optional for beginners.

3. **Run the Backend Application**:
   - In **Eclipse**, go to the **Package Explorer** and navigate to the package `com.capgemini.AirCareProject`.
   - Inside the package, locate the class `AirCareProjectApplication.java`.
   - Right-click on this class and choose **Run As > Java Application**.
   - The backend server will start running and should be accessible at `localhost:8181`.

4. **Configure MySQL Database**:
   
To set up the database for the project, you'll need to import the provided `AirCareDB.sql` file into MySQL Workbench. Follow these steps:


### 1. Open the Data Import Wizard
- In the top menu, navigate to **Server > Data Import**.
- This will open the **Data Import/Restore** tab, where you can specify the source of the SQL file and the target schema.

### 2. Select the SQL File to Import
- Under the **Import Options** section, choose **Import from Self-Contained File**.
- Click on the **Browse** button and navigate to the location of your `AirCareDB.sql` file. Select the file and confirm your selection.

### 3. Choose the Target Schema
- In the **Default Target Schema** dropdown, select the database into which you want to import the SQL file.
  - If the `complaintManagement` database already exists, select it from the list.
  - If the database doesn't exist, you can create it:
    - Click on the **New...** button next to the dropdown.
    - Enter `complaintManagement` as the new schema name and click **Apply** to create the database.

### 4. Start the Import Process
- Once you've selected the target schema, click on the **Start Import** button located at the bottom right of the window.
- MySQL Workbench will begin importing the SQL file. The progress will be displayed in the window.
- Wait for the process to complete. Once finished, you should see a message indicating the import was successful.

### 5. Verify the Imported Database
- In the **Navigator** panel on the left side of MySQL Workbench, click on the **Refresh** button (circular arrow icon) to reload the list of schemas.
- Expand the `complaintManagement` schema to view the imported tables and data.

By following these steps, you'll have successfully imported the `AirCareDB.sql` file into MySQL Workbench, setting up the necessary database for the project.



2. **Check Database Connection**:
   - After running the backend in Eclipse, the application will connect to the `complaintManagement` database. If the connection fails, double-check your credentials in the `application.properties` file and ensure MySQL is running.
   - In Eclipse, navigate to `src/main/resources/application.properties` and update your **MySQL username** and **password** like so:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/complaintManagement
     spring.datasource.username=your_mysql_username
     spring.datasource.password=your_mysql_password
     ```

---

## Step 2: Frontend Setup Instructions

1. **Install Required Extensions in VS Code**:
   - Make sure you have the following extensions installed in **VS Code**:
     - **HTML**
     - **CSS**
     - **JavaScript**
     - **Live Server** (this allows you to run HTML files locally in a browser)

2. **Configure API Paths**:
   - If you modify any API paths in the backend (e.g., changing endpoint URLs), make sure to update them in the frontend code so that the frontend and backend can communicate properly.

3. **Open Frontend in VS Code**:
   - In **VS Code**, navigate to the `index.html` file located under the `login` folder.
   - Right-click on the file and select **Open with Live Server** to run the frontend in your browser.
   - The frontend will open on a local server (usually at `localhost:5500` or another port provided by Live Server).

---




## Step 5: How to Run the Project

### 1. **Running the Backend**:
   - After completing the backend setup in Eclipse, locate the class `AirCareProjectApplication.java` under `com.capgemini.AirCareProject` in Eclipse.
   - Right-click on the file and choose **Run As > Java Application**.
   - The backend server will start running, and it should be accessible at `localhost:8181` by default.

### 2. **Running the Frontend**:
   - Open **VS Code** and navigate to the `index.html` file located in the `login` folder.
   - Right-click on the file and select **Open with Live Server**.
   - This will open the frontend in your browser. The frontend should now be accessible at `localhost:5500` (or another port provided by Live Server).

-------------

### **Troubleshooting**
-Eclipse Configuration Issues:

-Ensure you're using Eclipse Enterprise Edition (with Maven support).

-Check that all dependencies are correctly imported, and no other projects with the same name are present in the workspace.

### **MySQL Connection Issues:**

-Double-check the database URL, username, and password in the application.properties file to ensure they match your MySQL setup.

### **Live Server Not Working:**

-Make sure the Live Server extension is installed in VS Code and that the index.html file is opened with Live Server for local testing.

### **Final Notes**
Database: The project uses a MySQL database. Ensure that you have MySQL Workbench running and that the complaintManagement database is set up correctly.

Backend: Make sure that the backend is properly running in Eclipse before you test the frontend.

Frontend: You can run the frontend using the Live Server extension in VS Code, but you must first ensure the backend is running for it to fetch data properly.
