package com.frontalsneakers.api.service;

import com.frontalsneakers.api.dto.UserDtos;
import com.frontalsneakers.api.model.Address;
import com.frontalsneakers.api.model.User;
import com.frontalsneakers.api.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final UserService userService;

    public List<UserDtos.AddressDto> getUserAddresses() {
        User user = userService.getCurrentUser();
        return addressRepository.findByUserId(user.getId()).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public UserDtos.AddressDto addAddress(UserDtos.AddressDto dto) {
        User user = userService.getCurrentUser();
        Address address = Address.builder()
                .cep(dto.getCep())
                .street(dto.getStreet())
                .number(dto.getNumber())
                .neighborhood(dto.getNeighborhood())
                .complement(dto.getComplement())
                .reference(dto.getReference())
                .type(dto.getType())
                .contactName(dto.getContactName())
                .contactPhone(dto.getContactPhone())
                .nickname(dto.getNickname())
                .user(user)
                .build();
        Address savedAddress = addressRepository.save(address);
        return mapToDto(savedAddress);
    }

    public void deleteAddress(Long addressId) {
        User user = userService.getCurrentUser();
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new IllegalArgumentException("Address not found"));
        if (!address.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Unauthorized access to address");
        }
        addressRepository.delete(address);
    }

    private UserDtos.AddressDto mapToDto(Address address) {
        return UserDtos.AddressDto.builder()
                .id(address.getId())
                .cep(address.getCep())
                .street(address.getStreet())
                .number(address.getNumber())
                .neighborhood(address.getNeighborhood())
                .complement(address.getComplement())
                .reference(address.getReference())
                .type(address.getType())
                .contactName(address.getContactName())
                .contactPhone(address.getContactPhone())
                .nickname(address.getNickname())
                .build();
    }
}
