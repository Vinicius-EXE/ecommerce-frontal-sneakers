import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './payment-methods.html',
  styleUrl: './payment-methods.css',
})
export class PaymentMethods {
  paymentForm = new FormGroup({
    cardNumber: new FormControl('', [Validators.required]),
    holderName: new FormControl('', [Validators.required]),
    expiry: new FormControl('', [Validators.required]),
    cvv: new FormControl('', [Validators.required]),
    holderCpf: new FormControl('', [Validators.required]),
    nickname: new FormControl('', [Validators.required]),
  });

  savedCards = [
    { nickname: 'Nubank', holderName: 'Arthur Soares Pereira', lastDigits: '1234', selected: true },
    { nickname: 'Inter', holderName: 'Arthur Soares Pereira', lastDigits: '5678', selected: false },
  ];

  onCardNumberInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    this.paymentForm.get('cardNumber')?.setValue(value, { emitEvent: false });
  }

  onExpiryInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    }
    this.paymentForm.get('expiry')?.setValue(value, { emitEvent: false });
  }

  onCpfInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{3})/, '$1.$2');
    }

    this.paymentForm.get('holderCpf')?.setValue(value, { emitEvent: false });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      console.log('Payment Method Added', this.paymentForm.value);
      // Logic to add to savedCards would go here
    }
  }

  selectCard(index: number) {
    this.savedCards.forEach((card, i) => card.selected = i === index);
  }
}
