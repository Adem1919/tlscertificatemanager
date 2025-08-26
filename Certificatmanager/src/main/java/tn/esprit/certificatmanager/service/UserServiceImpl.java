package tn.esprit.certificatmanager.service;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.certificatmanager.entity.User;
import tn.esprit.certificatmanager.repository.UserRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements IUserService{
    private final UserRepository userRepository;

    @Override
    public List<User> retrieveAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User retrieveUser(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User modifyUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void removeUser(Long userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public User authenticate(User user) {
        return userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());
    }
}
