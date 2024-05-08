import { Component, inject, signal } from '@angular/core';
import {ProductsService} from '../../services/products.service'
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-porducts',
  standalone: true,
  imports: [HttpClientModule,ReactiveFormsModule,CommonModule],
  templateUrl: './porducts.component.html',
  styleUrl: './porducts.component.css'
})
export class PorductsComponent {
  private productsService = inject(ProductsService);
  products:Product[]=[];

  ngOnInit(){
    this.getAllProducts();
  }

  getAllProducts(){
    this.productsService.getAllSimple()
    .subscribe(product =>{
      this.products = product;
    })
  }


}
