import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './personal-info.html',
  styleUrl: './personal-info.css',
})
export class PersonalInfo {
  personalInfoForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    nickname: new FormControl('', [Validators.required, Validators.pattern(/@/)]),
    cpf: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService) {
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.personalInfoForm.patchValue(data);
      },
      error: (err) => console.error('Error fetching profile', err)
    });
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

    this.personalInfoForm.get('cpf')?.setValue(value, { emitEvent: false });
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

    this.personalInfoForm.get('phone')?.setValue(value, { emitEvent: false });
  }

  onSubmit() {
    if (this.personalInfoForm.valid) {
      this.userService.updateProfile(this.personalInfoForm.value).subscribe({
        next: (data) => alert('Informações atualizadas com sucesso!'),
        error: (err) => alert('Erro ao atualizar informações.')
      });
    }
  }
}
