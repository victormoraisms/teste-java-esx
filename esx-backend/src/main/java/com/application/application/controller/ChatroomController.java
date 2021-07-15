package com.application.application.controller;

import com.application.application.domain.dto.UserDTO;
import com.application.application.service.ChatroomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/chatroom")
public class ChatroomController {

  @Autowired
  private ChatroomService chatroomService;

  @PostMapping("/create/{name}/{id}")
  public ResponseEntity createUser(@PathVariable("name") String name, @PathVariable("id") Long id){

    return ResponseEntity.status(HttpStatus.CREATED).body(chatroomService.createRoom(name, id));
  }

}
