-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: complaintmanagement
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `complaints`
--

DROP TABLE IF EXISTS `complaints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaints` (
  `CID` bigint NOT NULL AUTO_INCREMENT,
  `ctID` bigint DEFAULT NULL,
  `dateFiled` date DEFAULT NULL,
  `deptID` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `userID` bigint NOT NULL,
  PRIMARY KEY (`CID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaints`
--

LOCK TABLES `complaints` WRITE;
/*!40000 ALTER TABLE `complaints` DISABLE KEYS */;
INSERT INTO `complaints` VALUES (1,4,'2025-04-24','D002','Baggage Never Arrived at the Belt','Pending',2),(2,8,'2025-04-15','D003','Cockroach Found in the Food','Pending',2),(3,10,'2025-04-15','D004','Staff was not guiding Properly at airport','Resolved',2),(4,6,'2025-04-17','D002','Baggage arrived very late , causing me to change in my plans further','Resolved',2),(5,3,'2025-04-15','D001','Flight was rescheduled without the Prior Notice','Resolved',2),(6,6,'2025-04-08','D002','Baggage delayed causing me to change my plans','Resolved',3),(7,10,'2025-04-17','D004','They seem specious about me because of clothing , which is wrong','In Progress',3),(8,7,'2025-04-30','D003','Cabin Crew Behavior in flight was not  appropriate','Pending',3),(9,8,'2025-04-17','D003','Got the uncooked meat','Pending',2),(20,7,'2025-04-24','D003','Crew was not bheaving with elders','Pending',3),(21,11,'2025-05-29','D004','They thought I am a specious person','Pending',3);
/*!40000 ALTER TABLE `complaints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complainttypes`
--

DROP TABLE IF EXISTS `complainttypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complainttypes` (
  `CTID` bigint NOT NULL AUTO_INCREMENT,
  `complaintType` varchar(255) NOT NULL,
  `severity` varchar(255) NOT NULL,
  PRIMARY KEY (`CTID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complainttypes`
--

LOCK TABLES `complainttypes` WRITE;
/*!40000 ALTER TABLE `complainttypes` DISABLE KEYS */;
INSERT INTO `complainttypes` VALUES (1,'Flight Delay (Flight Operation))','High'),(2,'Flight Cancelled (Flight Operation)','High'),(3,'Flight Rescheduled (Flight Operation)','High'),(4,'Baggage Lost (Baggage Services)','Medium'),(5,'Baggage Damaged (Baggage Services)','Low'),(6,'Baggage Delayed (Baggage Services)','Low'),(7,'Cabin Crew Behavior (Inflight Experience)','Low'),(8,'Food Quality (Inflight Experience)','Medium'),(9,'Seats Damaged (Inflight Experience)','Medium'),(10,'Denied Boarding (Checkin and Boarding Services)','High'),(11,'Rude Behaviour of Staff (Checkin and Boarding Services)','Medium');
/*!40000 ALTER TABLE `complainttypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `deptID` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`deptID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES ('D001','flight.ops@aircare.com','Flight Operations'),('D002','baggage@aircare.com','Baggage Services'),('D003','inflight@aircare.com','Inflight Experience'),('D004','boarding@aircare.com','Check-in and Boarding Services');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `mobile` bigint NOT NULL,
  `password` varchar(255) NOT NULL,
  `userType` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'omgade189@gmail.com',9423177240,'Omgade@123','Administrator','Om Gade'),(2,'sg733.@gmail.com',9423177242,'Sarthak@1234','User','Sarthak Gangurde'),(3,'shivamsaundale@123gmai.com',9960506210,'Shivam@123','User','Shivam'),(4,'vishalthakare@gmail.com',7767643563,'Vishal@123','User','Vishal Thakare'),(5,'utkarsh123@gmail.com',9999888877,'Utkarsh@123','User','Utkarsh'),(6,'siddharth@123gmail.com',9568235644,'Siddharth@123','User','Siddharth Gade'),(7,'nikhil123@gmail.com',7897805464,'Nikhil@123','User','Nikhil Hore'),(8,'rushibhosale@123gmail.com',9960506289,'Rushikesh@123','User','Rushikesh Bhosale'),(9,'rushi@123gmail.com',9960506219,'Rushi@123','User','Rushikesh'),(10,'rushibansode@1234',9999888871,'Rushi@123','User','Rushi Bansode'),(12,'shirish123@gmail.com',9960536210,'Shirish@123','User','Shirish Hirapure');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-04  0:27:52
