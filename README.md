# Clinic Management System – Django & Angular

The Smart Hospital Management System is a full-stack application designed to enhance hospital operations through real-time patient monitoring and automated resource management. The system integrates IoT-based health tracking, a Django backend, and an Angular frontend to deliver an efficient healthcare management solution.

## Features

* Real-Time Patient Monitoring
* IoT-enabled wristbands fitted with sensors continuously track heart rate, body temperature, oxygen levels, stress, GPS location, and send the data to the server in real time.
* Automated Emergency Alerts
* The system detects abnormal patient readings and automatically sends alerts to doctors, assigns emergency rooms, and initiates ambulance dispatch when necessary.
* Role-Based Dashboards
* Different dashboards are provided based on role:
* Doctor: View and update patient records, monitor live health data, respond to alerts.
* Super Admin: Manage doctors, patients, rooms, and system configurations with full CRUD access.

## Backend API Architecture

A Django REST API handles communication between **IoT devices, the database, and the Angular frontend**.

## Database Management

**MongoDB** stores patient information, sensor readings, and alert logs for efficient scalability.

## Technology Stack

* Frontend: Angular
* Backend: Django, Django REST Framework
* Database: MongoDB
* IoT Hardware: ESP32, health sensors, GPS module, GSM module
* Communication: REST API, HTTP requests

## Core Functionalities

* Patient registration and record management
* Continuous monitoring of vital signs
* Abnormal condition detection and alert generation
* Doctor allocation and emergency room assignment
* Ambulance dispatch system
* Secure login and role-based authentication
* Real-time data visualization on dashboards

## Outcome

The system streamlines hospital workflows by integrating patient monitoring, emergency response, and hospital management into a single platform. It enhances patient safety, reduces manual workload, and supports timely medical intervention.
