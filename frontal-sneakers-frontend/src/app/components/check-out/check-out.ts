import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para *ngIf e Pipes

// --- INTERFACES (Definições de Tipos) ---
export interface CartItem {
  name: string;
  price: number;
  image: string;
}

export interface Address {
  id: number;
  street: string;
  number: string;
  zipCode: string;
  city: string;
}

export interface PaymentData {
  method: 'pix' | 'credit_card' | 'boleto';
  cardName?: string;
  cardNumber?: string;
}

// --- COMPONENTE ---
@Component({
  selector: 'app-checkout',
  standalone: true, // Define que é um componente independente
  imports: [CommonModule], // Necessário para funcionar o *ngIf e o | number no HTML
  templateUrl: './check-out.html',
  styleUrls: ['./check-out.css']
})
export class CheckoutComponent {
  // Controle de Passos (1: Endereço, 2: Pagamento, 3: Revisão)
  currentStep: number = 1;

  // Controle de Estado do Endereço
  showAddressForm: boolean = false; 
  
  savedAddresses: Address[] = [
    { id: 1, street: 'Rua das Flores', number: '123', zipCode: '01001-000', city: 'São Paulo' }
  ];
  
  // Inicializa o endereço selecionado com o primeiro da lista, se existir
  selectedAddress: Address | null = this.savedAddresses.length > 0 ? this.savedAddresses[0] : null;

  // Controle de Pagamento
  selectedPaymentMethod: 'pix' | 'credit_card' | 'boleto' = 'credit_card';

  // Resumo do Carrinho (Estático)
  cartTotal: number = 599.90;
  freight: number = 20.00;

  constructor() {
    // Se não tiver endereço salvo, força a tela de cadastro
    if (this.savedAddresses.length === 0) {
      this.showAddressForm = true;
    }
  }

  // --- Navegação ---
  goToStep(step: number) {
    this.currentStep = step;
  }

  nextStep() {
    if (this.currentStep < 3) this.currentStep++;
  }

  // --- Ações de Endereço ---
  toggleAddressForm() {
    this.showAddressForm = !this.showAddressForm;
  }

  saveAddress() {
    // Mock de salvamento
    const newAddress: Address = { 
        id: 2, 
        street: 'Nova Rua Exemplo', 
        number: '99', 
        zipCode: '00000-000', 
        city: 'Exemplo' 
    };
    
    // Adiciona na lista e seleciona ele
    this.savedAddresses.push(newAddress);
    this.selectedAddress = newAddress;
    
    // Fecha o formulário
    this.showAddressForm = false;
  }

  // --- Ações Finais ---
  finishOrder() {
    alert('Compra finalizada com sucesso! Integração com Spring Boot pendente.');
  }
}