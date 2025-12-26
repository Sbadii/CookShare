package com.example.backendCookShare.controller;

import com.example.backendCookShare.model.dto.request.CommentRequest;
import com.example.backendCookShare.model.dto.response.CommentResponse;
import com.example.backendCookShare.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentResponse> addComment(@RequestBody CommentRequest request) {
        return ResponseEntity.ok(commentService.addComment(request));
    }
}
