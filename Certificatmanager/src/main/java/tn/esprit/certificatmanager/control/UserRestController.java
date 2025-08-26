package tn.esprit.certificatmanager.control;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.certificatmanager.entity.User;
import tn.esprit.certificatmanager.service.IUserService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
@CrossOrigin("*")
public class UserRestController {
    private final IUserService userService;

    @GetMapping("/retrieve-all-users")
    public List<User> getAllUsers() {
        return userService.retrieveAllUsers();
    }

    @GetMapping("/retrieve-user/{id}")
    public User getUserById(@PathVariable("id") Long id) {
        return userService.retrieveUser(id);
    }

    @PostMapping("/add-user")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @PutMapping("/modify-user")
    public User updateUser(@RequestBody User user) {
        return userService.modifyUser(user);
    }

    @DeleteMapping("/remove-user/{id}")
    public void deleteUser(@PathVariable("id") Long id) {
        userService.removeUser(id);
    }
    @PostMapping("/authenticate")
    public User authenticate(@RequestBody User user) {
        return userService.authenticate(user);
    }

}
