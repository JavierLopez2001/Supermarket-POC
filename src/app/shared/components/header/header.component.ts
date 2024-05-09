import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from 'src/app/shared/services/products.service';
import { AddProductDialogComponent } from '../../../components/add-product-dialog/add-product-dialog.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public dialog: MatDialog, public productService: ProductsService) { }

  openDialog(): void {

    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.addProduct(result).subscribe(() => {
        });
      }
    });
  }
}
