import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/prodcut.model';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  initialValues!: Product;
  isEditing = false;

  priceControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d+(\.\d{1,2})?$/)
  ]);

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductsService) {
    activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.productService.getProductById(params['id']).subscribe(product => {
          this.product = product;
          this.initialValues = JSON.parse(JSON.stringify(product));
        });
      }
    })

  }

  ngOnInit(): void {

  }

  editProduct() {
    this.isEditing = true;
  }

  changeFavorite(prodcut: Product){
    prodcut.favorite = !prodcut.favorite
    this.productService.editProduct(prodcut.id, prodcut).subscribe(() => {
    });
  }

  saveChanges() {
    this.isEditing = false;
    if (JSON.stringify(this.initialValues) !== JSON.stringify(this.product)) {
      this.productService.editProduct(this.product.id, this.product).subscribe(() => {
        this.productService.getProductById(this.product.id).subscribe(product => {
          this.product = product;
          this.initialValues = JSON.parse(JSON.stringify(product));
        });
      });
    }
  }
}

