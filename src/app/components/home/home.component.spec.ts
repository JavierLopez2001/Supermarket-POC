import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Product } from 'src/app/shared/models/prodcut.model';
import { SearchComponent } from '../search/search.component';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockProductsService: jasmine.SpyObj<ProductsService>;
  let mockActivatedRoute;

  beforeEach(async () => {
    mockProductsService = jasmine.createSpyObj(['getAll', 'editProduct', 'delete']);
    mockActivatedRoute = {
      params: of({ searchItem: 'test' })
    };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent,
        SearchComponent,
      ],
      imports:[
        MatProgressSpinnerModule,
        FormsModule
      ],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', () => {
    mockProductsService.getAll.and.returnValue(of([]));
    component.ngOnInit();
    expect(mockProductsService.getAll).toHaveBeenCalled();
  });

  it('should change favorite status of a product', () => {
    const product = new Product();
    product.id = 1;
    product.favorite = false;

    mockProductsService.editProduct.and.returnValue(of(product));
    component.changeFavorite(product);

    expect(product.favorite).toBeTrue();
    expect(mockProductsService.editProduct).toHaveBeenCalledWith(product.id, product);
  });

  it('should delete a product', () => {
    const productId = 1;
    const product = new Product();
    product.id = productId;

    mockProductsService.delete.and.returnValue(of(product));
    component.deleteItem(productId);

    expect(mockProductsService.delete).toHaveBeenCalledWith(productId);
  });

});
