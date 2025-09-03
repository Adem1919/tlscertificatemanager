# TLS Certificate Manager - Complete Setup Guide

This guide will help you set up and run the complete TLS Certificate Manager project from scratch. The project consists of:
- **Spring Boot Backend** (Java 23) - Certificate management and chatbot API
- **Angular Frontend** (v17) - User interface with floating chatbot widget
- **Python FastAPI Service** - FAISS-powered intelligent chatbot
- **MySQL Database** - Data persistence

## Prerequisites

Before starting, ensure you have the following installed:

### Required Software
1. **Java Development Kit (JDK) 23**
   - Download from: https://www.oracle.com/java/technologies/downloads/
   - Verify installation: `java --version`

2. **Node.js (v18 or higher) and npm**
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

3. **Angular CLI**
   - Install globally: `npm install -g @angular/cli`
   - Verify installation: `ng version`

4. **Python 3.8 or higher**
   - Download from: https://www.python.org/downloads/
   - Verify installation: `python --version`

5. **XAMPP (for MySQL)**
   - Download from: https://www.apachefriends.org/
   - Or install MySQL separately

6. **Git**
   - Download from: https://git-scm.com/

## Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd tlscertificatemanager
```

## Step 2: Database Setup (MySQL)

### Option A: Using XAMPP
1. Install and start XAMPP
2. Start Apache and MySQL services from XAMPP Control Panel
3. Open phpMyAdmin (http://localhost/phpmyadmin)
4. The database `certificatmanager` will be created automatically when you run the Spring Boot application

### Option B: Standalone MySQL
1. Install MySQL Server
2. Create a database named `certificatmanager`
3. Update credentials in `application.properties` if needed

## Step 3: Python FastAPI Service Setup

Navigate to the service directory:
```bash
cd Certificatmanager/src/main/java/tn/esprit/certificatmanager/service
```

### Install Python Dependencies
```bash
pip install fastapi uvicorn sentence-transformers faiss-cpu numpy pickle5 pydantic pandas
```

### Generate FAISS Index from Dataset

The project includes a comprehensive TLS/SSL dataset. Run the embedding script to generate the FAISS index:

```bash
python embedding.py
```

This script will:
- Load the TLS/SSL questions and answers from `../../../../../resources/dataset.csv`
- Generate embeddings using the SentenceTransformer model
- Create a FAISS index for fast similarity search
- Save the index (`faq_index.faiss`) and answers (`faq_answers.pkl`) locally

You should see the message: "✅ FAISS index and answers saved locally. Ready for testing!"

### Start the Python FastAPI Service
```bash
python -m uvicorn faiss_service:app --host 0.0.0.0 --port 8000 --reload
```

**Keep this terminal running** - The service should be accessible at http://localhost:8000

## Step 4: Spring Boot Backend Setup

Open a new terminal and navigate to the Spring Boot project:
```bash
cd Certificatmanager
```

### Build and Run the Spring Boot Application
```bash
# For Windows (PowerShell)
.\mvnw.cmd clean install
.\mvnw.cmd spring-boot:run

# For Linux/Mac
./mvnw clean install
./mvnw spring-boot:run
```

The Spring Boot application will start on http://localhost:8080

**Keep this terminal running**

### Verify Backend is Running
Test the chatbot endpoint:
```bash
# Test the chatbot health endpoint
curl http://localhost:8080/api/chatbot/health

# Test asking a question
curl -X POST http://localhost:8080/api/chatbot/ask -H "Content-Type: application/json" -d "{\"question\":\"What is TLS certificate?\"}"
```

## Step 5: Angular Frontend Setup

Open a new terminal and navigate to the Angular project:
```bash
cd certificat-frontend
```

### Install Dependencies
```bash
npm install
```

### Start the Angular Development Server
```bash
ng serve
```

The Angular application will be available at http://localhost:4200

**Keep this terminal running**

## Step 6: Verify Complete Setup

You should now have all three services running:
- **Python FastAPI**: http://localhost:8000
- **Spring Boot Backend**: http://localhost:8080
- **Angular Frontend**: http://localhost:4200

### Test the Complete Flow

1. **Open your browser** and go to http://localhost:4200
2. **Login/Register** using the authentication system
3. **Access the certificate management** features
4. **Test the chatbot**:
   - Look for the chat icon in the navbar (top-right)
   - Click it to open the floating chatbot widget
   - Ask questions like:
     - "What is a TLS certificate?"
     - "How to renew SSL certificate?"
     - "What is certificate expiration?"

## Troubleshooting

### Common Issues and Solutions

#### Port Conflicts
- **Port 8080 already in use**: Change Spring Boot port in `application.properties`:
  ```properties
  server.port=8089
  ```
- **Port 4200 already in use**: Start Angular on different port:
  ```bash
  ng serve --port 4201
  ```

#### Database Connection Issues
- Ensure MySQL is running (XAMPP Control Panel)
- Check database credentials in `application.properties`
- Verify database `certificatmanager` exists

#### Python Service Issues
- Ensure all Python packages are installed: `pip list`
- Check if FAISS index files exist in the service directory
- Verify Python service is accessible: http://localhost:8000/docs

#### Angular Build Issues
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Update Angular CLI: `npm update -g @angular/cli`

#### CORS Issues
If you encounter CORS errors, the Spring Boot backend is already configured to allow cross-origin requests from localhost:4200.

## Development Commands

### Backend Development
```bash
# Run with specific profile
.\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev

# Run tests
.\mvnw.cmd test

# Package application
.\mvnw.cmd package
```

### Frontend Development
```bash
# Build for production
ng build --prod

# Run tests
ng test

# Run e2e tests
ng e2e

# Update dependencies
npm update
```

### Python Service Development
```bash
# Install development dependencies
pip install fastapi[all] uvicorn[standard]

# Run with auto-reload
uvicorn faiss_service:app --reload --host 0.0.0.0 --port 8000
```

## Project Structure Overview

```
tlscertificatemanager/
├── Certificatmanager/                 # Spring Boot Backend
│   ├── src/main/java/tn/esprit/certificatmanager/
│   │   ├── controller/               # REST Controllers
│   │   ├── service/                  # Business Logic + Python Service
│   │   ├── entity/                   # JPA Entities
│   │   └── repository/               # Data Access Layer
│   └── src/main/resources/
│       └── application.properties    # Database & Server Config
├── certificat-frontend/              # Angular Frontend
│   ├── src/app/
│   │   ├── components/              # UI Components (including chatbot)
│   │   ├── services/                # Angular Services
│   │   ├── models/                  # TypeScript Models
│   │   └── guard/                   # Route Guards
│   └── package.json                 # Node Dependencies
└── README.md
```

## Next Steps

After successful setup:
1. **Customize the chatbot**: Add more TLS-related questions and answers to the FAISS database
2. **Configure production settings**: Update database credentials and server configurations
3. **Deploy to production**: Consider Docker containerization for easier deployment
4. **Add monitoring**: Implement logging and monitoring for all services

## Support

If you encounter any issues:
1. Check all services are running on their respective ports
2. Verify database connectivity
3. Ensure all dependencies are properly installed
4. Check the console logs for error messages

For additional help, refer to the documentation of individual technologies:
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Angular Documentation](https://angular.io/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
