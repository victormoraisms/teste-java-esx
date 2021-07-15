package com.application.application.service;

import com.application.application.domain.Chatroom;
import com.application.application.domain.User;
import com.application.application.domain.dto.ChatroomDTO;
import com.application.application.domain.repository.ChatroomRepository;
import com.application.application.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChatroomService {

  @Autowired
  private ChatroomRepository chatroomRepository;

  @Autowired
  private UserRepository userRepository;

  public long createRoom(String name, Long ownerId){

    Chatroom chat = chatroomRepository.save(Chatroom.builder().name(name).ownerId(ownerId).build());

    Optional<User> owner = userRepository.findById(ownerId);

    if(owner != null){
      owner.get().setChatroom(chat.getId());
    }

    return chat.getId();

  }
}
