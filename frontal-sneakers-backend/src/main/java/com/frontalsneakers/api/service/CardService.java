package com.frontalsneakers.api.service;

import com.frontalsneakers.api.dto.UserDtos;
import com.frontalsneakers.api.model.Card;
import com.frontalsneakers.api.model.User;
import com.frontalsneakers.api.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CardService {

    private final CardRepository cardRepository;
    private final UserService userService;

    public List<UserDtos.CardDto> getUserCards() {
        User user = userService.getCurrentUser();
        return cardRepository.findByUserId(user.getId()).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public UserDtos.CardDto addCard(UserDtos.CardDto dto) {
        User user = userService.getCurrentUser();
        Card card = Card.builder()
                .cardNumber(dto.getCardNumber()) // In a real app, encrypt this!
                .holderName(dto.getHolderName())
                .expiryDate(dto.getExpiryDate())
                .cvv(dto.getCvv())
                .holderCpf(dto.getHolderCpf())
                .nickname(dto.getNickname())
                .lastDigits(dto.getCardNumber().substring(dto.getCardNumber().length() - 4))
                .user(user)
                .build();
        Card savedCard = cardRepository.save(card);
        return mapToDto(savedCard);
    }

    public void deleteCard(Long cardId) {
        // Ensure the card belongs to the current user
        User user = userService.getCurrentUser();
        Card card = cardRepository.findById(cardId)
                .orElseThrow(() -> new IllegalArgumentException("Card not found"));
        if (!card.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Unauthorized access to card");
        }
        cardRepository.delete(card);
    }

    private UserDtos.CardDto mapToDto(Card card) {
        return UserDtos.CardDto.builder()
                .id(card.getId())
                .cardNumber(card.getCardNumber())
                .holderName(card.getHolderName())
                .expiryDate(card.getExpiryDate())
                .cvv(card.getCvv())
                .holderCpf(card.getHolderCpf())
                .nickname(card.getNickname())
                .lastDigits(card.getLastDigits())
                .build();
    }
}
