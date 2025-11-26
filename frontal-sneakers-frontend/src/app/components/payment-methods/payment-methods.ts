import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

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

  savedCards: any[] = [];
  isEditing = false;
  editingCardId: number | null = null;
  showDeleteConfirmation = false;
  cardToDeleteId: number | null = null;

  constructor(private userService: UserService) {
    this.loadCards();
  }

  loadCards() {
    this.userService.getCards().subscribe({
      next: (data) => this.savedCards = data,
      error: (err) => console.error('Error fetching cards', err)
    });
  }

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
      if (this.isEditing && this.editingCardId) {
        this.userService.deleteCard(this.editingCardId).subscribe({
          next: () => {
            this.addCard(true);
          },
          error: (err) => alert('Erro ao atualizar cartão.')
        });
      } else {
        this.addCard();
      }
    }
  }

  addCard(isUpdate = false) {
    this.userService.addCard(this.paymentForm.value).subscribe({
      next: (data) => {
        this.loadCards();
        this.paymentForm.reset();
        this.isEditing = false;
        this.editingCardId = null;
        alert(isUpdate ? 'Cartão atualizado com sucesso!' : 'Cartão salvo com sucesso!');
      },
      error: (err) => alert('Erro ao salvar cartão.')
    });
  }

  selectCard(index: number) {
    this.savedCards.forEach((card, i) => card.selected = i === index);
  }

  startEdit(card: any) {
    this.isEditing = true;
    this.editingCardId = card.id;
    this.paymentForm.patchValue(card);
  }

  confirmDelete(id: number) {
    this.cardToDeleteId = id;
    this.showDeleteConfirmation = true;
  }

  cancelDelete() {
    this.showDeleteConfirmation = false;
    this.cardToDeleteId = null;
  }

  deleteCard() {
    if (this.cardToDeleteId) {
      this.userService.deleteCard(this.cardToDeleteId).subscribe({
        next: () => {
          this.loadCards();
          this.showDeleteConfirmation = false;
          this.cardToDeleteId = null;
        },
        error: (err) => alert('Erro ao excluir cartão.')
      });
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingCardId = null;
    this.paymentForm.reset();
  }
}
