# Presentation Link

https://drive.google.com/file/d/1iNjGtW7Z8iuwp_sst8Z7tfflOpOuOPYo/view

Note: The audio recording is missing due to issues with finding a suitable microphone.

---

# Doctor Appointment System

The **Doctor Appointment System** is a full-stack web application designed to simplify the process of booking, managing, and confirming doctor appointments. This system provides an intuitive interface for both patients and administrators, with robust backend services for managing data and user interactions.

---

## Features

### 1. **Patient Features**
- **Doctor Search:** Search for doctors by specialization, location, or name.
- **Appointment Booking:** Book appointments with doctors, including selecting a date and time.
- **Comment Section:** Leave feedback for doctors and share experiences.
- **View Appointments:** See all appointments or delete

### 2. **Admin Features**
- **Admin Login:** Secure login for administrators to manage the system.

### 3. **Other Features**
- **Notification System:** Sends email reminders to users who do not complete their appointment booking.
- **Responsive Design:** The application is mobile-friendly and works seamlessly across devices.

---

## Technologies Used

### **Frontend**
- **React.js:** For building the user interface.
- **CSS:** Custom styles for a clean and responsive design.

### **Backend**
- **Node.js & Express.js:** Backend server to handle API requests.
- **MongoDB (via Mongoose):** NoSQL database for storing comments and user feedback.
- **MySQL:** Relational database for managing doctor and appointment data.
- **RabbitMQ:** Message queue for handling asynchronous email notifications.

### **Other Tools**
- **Postman:** For API testing.
- **Docker:** Containerized deployment.
- **GitHub:** Version control and project repository.
- **WebStorm:** Integrated Development Environment (IDE) for efficient coding and debugging.

---

## Project Structure

```
src/
│
├── components/          # Reusable React components
├── pages/               # Application pages (Home, Login, etc.)
├── styles/              # CSS files for styling
├── routes/              # Backend API routes
├── controllers/         # Logic for handling API requests
├── models/              # MongoDB models for comments
├── config/              # Database and environment configurations
└── services/            # RabbitMQ consumer and publisher logic
```

---

## Installation and Setup

### Prerequisites
- [Node.js]
- [MongoDB]
- [MySQL]
- [Docker]
- [RabbitMQ]

### Steps

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root directory and configure the following variables:
   ```env
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/doctor_db
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=yourpassword
   MYSQL_DATABASE=doctor_db
   RABBITMQ_URL=amqp://localhost
   ```

3. **Start RabbitMQ:**
   
   Make sure RabbitMQ is running on your system.
   ![Ekran görüntüsü 2025-01-28 012053](https://github.com/user-attachments/assets/c5d917d6-05a3-47f8-a680-7944043ea7f2)


4. **Start the Backend Server:**
   ```bash
   cd doctor-backend

   node src/server.js
   ```

5. **Start the Frontend Application:**
   ```bash
   npm start
   ```

6. **Run with Docker (Optional):**
   Build and run the application with Docker Compose:
   ```bash
   docker-compose up --build
   ```

---

## API Endpoints

### **Doctors**
- **POST /api/doctors/register**: Register a new doctor.
- **GET /api/doctors/pending**: Retrieve a list of pending doctor registrations.
- **PUT /api/doctors/approve/:id**: Approve a doctor's registration.
- **GET /api/doctors/search**: Search for doctors by name, specialization, city, or country.

### **Appointments**
- **POST /api/appointments**: Create a new appointment.
- **GET /api/appointments**: Retrieve all appointments.
- **DELETE /api/appointments/:id**: Delete an appointment by ID.

### **Comments**
- **POST /api/comments**: Add a comment for a doctor.
- **GET /api/comments/:doctorId**: Retrieve comments for a specific doctor.

---

## Screenshots

### Postman
![Ekran görüntüsü 2025-01-28 023300](https://github.com/user-attachments/assets/cc4b01a0-61ab-4ab5-abe5-83b21cd4985b)
![Ekran görüntüsü 2025-01-28 023427](https://github.com/user-attachments/assets/e5d1f975-5afe-44ac-9bea-0e73581f12e2)
![Ekran görüntüsü 2025-01-28 023533](https://github.com/user-attachments/assets/aa657618-64f4-4070-9dbc-1db366eb76bf)
![Ekran görüntüsü 2025-01-28 023811](https://github.com/user-attachments/assets/18065dc1-5018-4d7e-9906-46735ef8568c)
![Ekran görüntüsü 2025-01-28 023905](https://github.com/user-attachments/assets/7e3d5985-b735-4f43-b723-2af2267c2b5f)
![Ekran görüntüsü 2025-01-28 024006](https://github.com/user-attachments/assets/8d563328-c5c4-4a6c-ae13-a348bf8b4f1c)
![Ekran görüntüsü 2025-01-28 024403](https://github.com/user-attachments/assets/5a2d565e-3f34-4aef-adae-918970210ccf)
![Ekran görüntüsü 2025-01-28 024517](https://github.com/user-attachments/assets/239fb4de-366b-457f-8792-428ad1d7bbe6)









---

