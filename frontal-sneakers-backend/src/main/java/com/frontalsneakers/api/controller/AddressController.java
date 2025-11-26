package com.frontalsneakers.api.controller;

import com.frontalsneakers.api.dto.UserDtos;
import com.frontalsneakers.api.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @GetMapping
    public ResponseEntity<List<UserDtos.AddressDto>> getAddresses() {
        return ResponseEntity.ok(addressService.getUserAddresses());
    }

    @PostMapping
    public ResponseEntity<UserDtos.AddressDto> addAddress(@RequestBody UserDtos.AddressDto dto) {
        return ResponseEntity.ok(addressService.addAddress(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long id) {
        addressService.deleteAddress(id);
        return ResponseEntity.ok().build();
    }
}
