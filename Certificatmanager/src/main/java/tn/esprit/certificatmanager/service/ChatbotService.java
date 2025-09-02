package tn.esprit.certificatmanager.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class ChatbotService {

    @Value("${chatbot.python.service.url:http://localhost:8000}")
    private String pythonServiceUrl;
    
    @Value("${chatbot.distance.threshold:0.7}")
    private double distanceThreshold;
    
    private static final String DEFAULT_RESPONSE = "Je suis spécialisé dans les certificats TLS";
    
    private final RestTemplate restTemplate = new RestTemplate();

    public String askQuestion(String question) {
        try {
            log.info("Processing question: {}", question);

            // Create request for Python service
            Map<String, Object> request = new HashMap<>();
            request.put("question", question);
            request.put("top_k", 1);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);

            // Call Python FAISS service
            ResponseEntity<Map> response = restTemplate.exchange(
                    pythonServiceUrl + "/query",
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> responseBody = response.getBody();
                List<Map<String, Object>> results = (List<Map<String, Object>>) responseBody.get("results");
                
                if (results != null && !results.isEmpty()) {
                    Map<String, Object> bestResult = results.get(0);
                    double distance = ((Number) bestResult.get("distance")).doubleValue();
                    String answer = (String) bestResult.get("answer");
                    
                    log.info("Best result distance: {} (threshold: {})", distance, distanceThreshold);
                    
                    // Check if answer is relevant
                    if (distance <= distanceThreshold) {
                        log.info("Answer is relevant, returning: {}", answer);
                        return answer;
                    } else {
                        log.info("Answer not relevant, returning default response");
                        return DEFAULT_RESPONSE;
                    }
                }
            }
            
            log.warn("No results from Python service");
            return DEFAULT_RESPONSE;

        } catch (org.springframework.web.client.ResourceAccessException e) {
            log.error("Python FAISS service is not available: {}", e.getMessage());
            throw new RuntimeException("Python FAISS service is not reachable at " + pythonServiceUrl, e);
        } catch (org.springframework.web.client.HttpClientErrorException e) {
            log.error("HTTP error from Python service: {} - {}", e.getStatusCode(), e.getMessage());
            throw new RuntimeException("Python FAISS service returned error: " + e.getStatusCode(), e);
        } catch (Exception e) {
            log.error("Unexpected error processing question: {}", e.getMessage());
            throw new RuntimeException("Unexpected error communicating with Python service", e);
        }
    }
    
    /**
     * Test if Python service is reachable
     */
    public boolean isPythonServiceHealthy() {
        try {
            askQuestion("health test");
            return true;
        } catch (Exception e) {
            log.debug("Python service health check failed: {}", e.getMessage());
            return false;
        }
    }
}
