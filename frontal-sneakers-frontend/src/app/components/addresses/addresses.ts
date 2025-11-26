import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addresses.html',
  styleUrl: './addresses.css',
})
export class Addresses {
  addressForm = new FormGroup({
    cep: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    neighborhood: new FormControl('', [Validators.required]),
    complement: new FormControl(''),
    reference: new FormControl(''),
    type: new FormControl('home', [Validators.required]),
    contactName: new FormControl('', [Validators.required]),
    contactPhone: new FormControl('', [Validators.required]),
    nickname: new FormControl('', [Validators.required]),
  });

  savedAddresses: any[] = [];
  isEditing = false;
  editingAddressId: number | null = null;
  showDeleteConfirmation = false;
  addressToDeleteId: number | null = null;

  constructor(private userService: UserService) {
    this.loadAddresses();
  }

  loadAddresses() {
    this.userService.getAddresses().subscribe({
      next: (data) => this.savedAddresses = data,
      error: (err) => console.error('Error fetching addresses', err)
    });
  }

  async onCepInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);

    if (value.length > 5) {
      value = value.replace(/(\d{5})(\d{1,3})/, '$1-$2');
    }

    this.addressForm.get('cep')?.setValue(value, { emitEvent: false });

    if (value.replace('-', '').length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${value.replace('-', '')}/json/`);
        const data = await response.json();
        if (!data.erro) {
          this.addressForm.patchValue({
            street: data.logradouro,
            neighborhood: data.bairro,
            // city and state could be added if needed
          });
        }
      } catch (error) {
        console.error('Error fetching CEP', error);
      }
    }
  }

  onPhoneInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 6) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    }

    this.addressForm.get('contactPhone')?.setValue(value, { emitEvent: false });
  }

  onSubmit() {
    if (this.addressForm.valid) {
      if (this.isEditing && this.editingAddressId) {
        this.userService.deleteAddress(this.editingAddressId).subscribe({
          next: () => {
            this.addAddress(true);
          },
          error: (err) => alert('Erro ao atualizar endereço.')
        });
      } else {
        this.addAddress();
      }
    }
  }

  addAddress(isUpdate = false) {
    this.userService.addAddress(this.addressForm.value).subscribe({
      next: (data) => {
        this.loadAddresses();
        this.addressForm.reset();
        this.addressForm.get('type')?.setValue('home'); // Reset default
        this.isEditing = false;
        this.editingAddressId = null;
        alert(isUpdate ? 'Endereço atualizado com sucesso!' : 'Endereço salvo com sucesso!');
      },
      error: (err) => alert('Erro ao salvar endereço.')
    });
  }

  selectAddress(index: number) {
    this.savedAddresses.forEach((addr, i) => addr.selected = i === index);
  }

  startEdit(address: any) {
    this.isEditing = true;
    this.editingAddressId = address.id;
    this.addressForm.patchValue(address);
  }

  confirmDelete(id: number) {
    this.addressToDeleteId = id;
    this.showDeleteConfirmation = true;
  }

  cancelDelete() {
    this.showDeleteConfirmation = false;
    this.addressToDeleteId = null;
  }

  deleteAddress() {
    if (this.addressToDeleteId) {
      this.userService.deleteAddress(this.addressToDeleteId).subscribe({
        next: () => {
          this.loadAddresses();
          this.showDeleteConfirmation = false;
          this.addressToDeleteId = null;
        },
        error: (err) => alert('Erro ao excluir endereço.')
      });
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingAddressId = null;
    this.addressForm.reset();
    this.addressForm.get('type')?.setValue('home');
  }
}
