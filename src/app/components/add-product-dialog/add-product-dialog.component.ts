import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent {
  product = {
    name: '',
    price: 0.0,
    origin: '',
    time: '',
    favorite: false,
    image: '',
  };

  constructor(public dialogRef: MatDialogRef<AddProductDialogComponent>, private snackBar: SnackbarService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (!this.product || this.product.name === '' || this.product.price === 0 || this.product.origin === '' || this.product.time === '' || this.product.image === '') {
      this.snackBar.showSnackBar("There are invalid fields")
      return
    } else {
      this.dialogRef.close(this.product);
    }
  }
}
