package com.frontalsneakers.api.controller;

import com.frontalsneakers.api.dto.UserDtos;
import com.frontalsneakers.api.service.CardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/cards")
@RequiredArgsConstructor
public class CardController {

    private final CardService cardService;

    @GetMapping
    public ResponseEntity<List<UserDtos.CardDto>> getCards() {
        return ResponseEntity.ok(cardService.getUserCards());
    }

    @PostMapping
    public ResponseEntity<UserDtos.CardDto> addCard(@RequestBody UserDtos.CardDto dto) {
        return ResponseEntity.ok(cardService.addCard(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCard(@PathVariable Long id) {
        cardService.deleteCard(id);
        return ResponseEntity.ok().build();
    }
}
