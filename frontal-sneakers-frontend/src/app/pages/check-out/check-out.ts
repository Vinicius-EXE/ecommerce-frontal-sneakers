import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './check-out.html',
  styleUrls: ['./check-out.css']
})
export class CheckoutComponent implements OnInit {
  currentStep: number = 1;
  checkoutForm: FormGroup;
  
  // Dados simulados do carrinho
  cartTotal: number = 899.90; // Preço do Asics da imagem
  freight: number = 0; // Frete grátis geralmente agrada mais

  constructor(private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      address: this.fb.group({
        cep: ['', [Validators.required, Validators.minLength(9)]],
        street: ['', Validators.required],
        number: ['', Validators.required],
        complement: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        type: ['casa']
      }),
      payment: this.fb.group({
        method: ['credit_card', Validators.required],
        cardNumber: [''],
        cardName: [''],
        cardExpiry: [''],
        cardCvv: [''],
        cpf: ['']
      })
    });
  }

  ngOnInit(): void {
    // Reage a mudanças no método de pagamento para validar ou não o cartão
    this.checkoutForm.get('payment.method')?.valueChanges.subscribe(method => {
      const creditControls = ['cardNumber', 'cardName', 'cardExpiry', 'cardCvv', 'cpf'];
      if (method === 'credit_card') {
        creditControls.forEach(c => this.checkoutForm.get(`payment.${c}`)?.setValidators([Validators.required]));
      } else {
        creditControls.forEach(c => this.checkoutForm.get(`payment.${c}`)?.clearValidators());
      }
      creditControls.forEach(c => this.checkoutForm.get(`payment.${c}`)?.updateValueAndValidity());
    });
  }

  // --- Navegação ---
  nextStep() {
    if (this.currentStep === 1 && this.checkoutForm.get('address')?.valid) {
      this.currentStep++;
    } else if (this.currentStep === 2 && this.checkoutForm.get('payment')?.valid) {
      this.currentStep++;
    } else {
      this.checkoutForm.markAllAsTouched(); // Mostra erros se houver
      if(this.currentStep === 1) alert("Preencha o endereço corretamente.");
    }
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  finishOrder() {
    console.log('Dados do Pedido:', this.checkoutForm.value);
    alert('Pedido realizado com sucesso! Integração com API pronta.');
  }

  // --- Formatadores de Input (Máscaras) ---
  
  // Apenas números e formatação de CEP (00000-000)
  formatCEP(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 5) value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    this.checkoutForm.get('address.cep')?.setValue(value);
  }

  // Formatação de Cartão (0000 0000 0000 0000)
  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    this.checkoutForm.get('payment.cardNumber')?.setValue(value.substring(0, 19));
  }

  // Formatação de Validade (MM/AA)
  formatExpiry(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) value = value.replace(/^(\d{2})(\d)/, '$1/$2');
    this.checkoutForm.get('payment.cardExpiry')?.setValue(value.substring(0, 5));
  }

  // Formatação de CPF (000.000.000-00)
  formatCPF(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    this.checkoutForm.get('payment.cpf')?.setValue(value.substring(0, 14));
  }
  
  // Apenas números genérico
  onlyNumbers(event: any, controlName: string, groupName: string) {
    const value = event.target.value.replace(/\D/g, '');
    this.checkoutForm.get(`${groupName}.${controlName}`)?.setValue(value);
  }
}