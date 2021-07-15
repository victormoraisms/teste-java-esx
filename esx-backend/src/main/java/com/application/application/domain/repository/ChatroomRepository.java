package com.application.application.domain.repository;

import com.application.application.domain.Chatroom;
import com.application.application.domain.User;
import org.springframework.data.repository.CrudRepository;

public interface ChatroomRepository extends CrudRepository<Chatroom, Long> {
}
