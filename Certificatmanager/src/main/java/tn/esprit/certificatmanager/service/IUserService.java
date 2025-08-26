package tn.esprit.certificatmanager.service;
import tn.esprit.certificatmanager.entity.User;
import java.util.List;
public interface IUserService {
    List<User> retrieveAllUsers();
    User retrieveUser(Long userId);
    User addUser(User user);
    User modifyUser(User user);
    void removeUser(Long userId);
    User authenticate(User user);
}
