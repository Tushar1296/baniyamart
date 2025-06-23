package com.baniyamart.backend.service;

import com.baniyamart.backend.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(User user);

    List<User> getAllUsers();

    Optional<User> getUserById(String id);

    Optional<User> getUserByEmail(String email);

    User updateUser(String id, User updatedUser);

    void deleteUser(String id);
}
