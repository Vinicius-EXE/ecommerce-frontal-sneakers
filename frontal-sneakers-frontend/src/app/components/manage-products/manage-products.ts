import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './manage-products.html',
  styleUrl: './manage-products.css',
})
export class ManageProducts implements OnInit {
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    sizes: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    images: new FormControl('', [Validators.required]),
  });

  products: any[] = [];
  isEditing = false;
  editingProductId: number | null = null;
  showDeleteConfirmation = false;
  productToDeleteId: number | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts(0, 1000).subscribe({
      next: (data) => this.products = data.content,
      error: (err) => console.error('Error loading products', err)
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      if (this.isEditing && this.editingProductId) {
        this.productService.updateProduct(this.editingProductId, this.productForm.value).subscribe({
          next: () => {
            alert('Produto atualizado com sucesso!');
            this.loadProducts();
            this.resetForm();
          },
          error: (err) => alert('Erro ao atualizar produto.')
        });
      } else {
        this.productService.createProduct(this.productForm.value).subscribe({
          next: () => {
            alert('Produto adicionado com sucesso!');
            this.loadProducts();
            this.resetForm();
          },
          error: (err) => alert('Erro ao adicionar produto.')
        });
      }
    }
  }

  startEdit(product: any) {
    this.isEditing = true;
    this.editingProductId = product.id;
    this.productForm.patchValue(product);
  }

  confirmDelete(id: number) {
    this.productToDeleteId = id;
    this.showDeleteConfirmation = true;
  }

  cancelDelete() {
    this.showDeleteConfirmation = false;
    this.productToDeleteId = null;
  }

  deleteProduct() {
    if (this.productToDeleteId) {
      this.productService.deleteProduct(this.productToDeleteId).subscribe({
        next: () => {
          alert('Produto excluído com sucesso!');
          this.loadProducts();
          this.showDeleteConfirmation = false;
          this.productToDeleteId = null;
        },
        error: (err) => alert('Erro ao excluir produto.')
      });
    }
  }

  resetForm() {
    this.isEditing = false;
    this.editingProductId = null;
    this.productForm.reset();
  }

  cancelEdit() {
    this.resetForm();
  }
}
