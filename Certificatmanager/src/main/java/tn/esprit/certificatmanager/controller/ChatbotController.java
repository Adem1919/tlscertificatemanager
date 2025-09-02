package tn.esprit.certificatmanager.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.certificatmanager.service.ChatbotService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin(origins = "*")
@AllArgsConstructor
@Slf4j
public class ChatbotController {

    ChatbotService chatbotService;

    @PostMapping("/ask")
    public ResponseEntity<Map<String, Object>> askQuestion(@RequestBody Map<String, String> request) {
        try {
            String question = request.get("question");
            
            if (question == null || question.trim().isEmpty()) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "La question ne peut pas être vide");
                errorResponse.put("success", false);
                return ResponseEntity.badRequest().body(errorResponse);
            }

            log.info("Received question: {}", question);
            
            String answer = chatbotService.askQuestion(question.trim());
            
            Map<String, Object> response = new HashMap<>();
            response.put("answer", answer);
            response.put("success", true);
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(response);
            
        } catch (RuntimeException e) {
            // This catches Python service connection errors
            log.error("Python service error: {}", e.getMessage());
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Service temporairement indisponible");
            errorResponse.put("answer", "Service est temporairement indisponible. Veuillez réessayer plus tard.");
            errorResponse.put("success", false);
            errorResponse.put("python_service_status", "DOWN");
            errorResponse.put("timestamp", System.currentTimeMillis());
            return ResponseEntity.status(503).body(errorResponse);
            
        } catch (Exception e) {
            log.error("Unexpected error processing chatbot question", e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Une erreur interne s'est produite");
            errorResponse.put("answer", "Je suis spécialisé dans les certificats TLS");
            errorResponse.put("success", false);
            errorResponse.put("timestamp", System.currentTimeMillis());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Test if Python FAISS service is available
            String testAnswer = chatbotService.askQuestion("test");
            
            response.put("status", "UP");
            response.put("spring_service", "UP");
            response.put("python_faiss_service", "UP");
            response.put("message", "Both services are running");
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Health check failed - Python service unavailable: {}", e.getMessage());
            
            response.put("status", "DOWN");
            response.put("spring_service", "UP");
            response.put("python_faiss_service", "DOWN");
            response.put("error", "Python FAISS service is not available");
            response.put("message", "Spring service is running but Python service is unreachable");
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.status(503).body(response); // 503 Service Unavailable
        }
    }
}
