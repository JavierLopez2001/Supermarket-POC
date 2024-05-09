import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/prodcut.model';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  items: Product[] = [];
  loading = true;

  constructor(private products: ProductsService, private route:ActivatedRoute) {
  }

  ngOnInit(){
    this.loadData().then(() => {
      this.loading = false;
    });
  }

  async loadData() {
    return new Promise<void>((resolve) => {
      this.route.params.subscribe(params=>{
        if(params['searchItem']){
          this.products.getAll().subscribe(data=>{
            this.items = data.filter(product => product.name.toLowerCase().includes(params['searchItem'].toLowerCase()));
            resolve();
          })
        }else{
          this.products.getAll().subscribe(data=>{
            this.items = data;
            resolve();
          })
        }
      })

      this.products.products$.subscribe(products => {
        this.items = products;
        resolve();
      });
    });
  }

  changeFavorite(item: Product){
    item.favorite = !item.favorite
    this.products.editProduct(item.id, item).subscribe(() => {
    });
  }

  deleteItem(id: number) {
    this.products.delete(id).subscribe();
 }
}
