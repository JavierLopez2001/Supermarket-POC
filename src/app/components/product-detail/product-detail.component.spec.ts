import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductDetailComponent } from './product-detail.component';
import { ProductsService } from 'src/app/shared/services/products.service';
import { of } from 'rxjs';
import { Product } from 'src/app/shared/models/prodcut.model';
import { ActivatedRoute } from '@angular/router';
import { NotFoundComponent } from 'src/app/core/components/not-found/not-found.component';
import { MatIconModule } from '@angular/material/icon';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productService: ProductsService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent,
        NotFoundComponent
      ],
      imports: [
        MatIconModule
      ],
      providers: [
        {
          provide: ProductsService, useValue: {
            getProductById: () => of(new Product()),
            editProduct: () => of(null),
            getAll: () => of([])
          }
        },
        { provide: ActivatedRoute, useValue: { params: of({ id: 123 }) } }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isEditing to true when editProduct is called', () => {
    component.editProduct();
    expect(component.isEditing).toBeTrue();
  });

  it('should toggle product favorite status when changeFavorite is called', () => {
    const product = new Product();
    product.favorite = false;
    spyOn(productService, 'editProduct').and.returnValue(of(null));

    component.changeFavorite(product);
    expect(product.favorite).toBeTrue();
    expect(productService.editProduct).toHaveBeenCalledWith(product.id, product);
  });

  it('should set isEditing to false and update product when saveChanges is called and product has changed', () => {
    const product = new Product();
    product.id = 1;
    product.favorite = false;
    component.product = product;
    component.initialValues = new Product();
    component.initialValues.id = 1;
    component.initialValues.favorite = true;

    spyOn(productService, 'editProduct').and.returnValue(of(null));
    spyOn(productService, 'getProductById').and.returnValue(of(product));

    component.saveChanges();

    expect(component.isEditing).toBeFalse();
    expect(productService.editProduct).toHaveBeenCalledWith(product.id, product);
    expect(productService.getProductById).toHaveBeenCalledWith(product.id);
  });


  it('should not update product when saveChanges is called and product has not changed', () => {
    const product = new Product();
    component.product = product;
    component.initialValues = product;
    spyOn(productService, 'editProduct');
    spyOn(productService, 'getProductById');

    component.saveChanges();
    expect(component.isEditing).toBeFalse();
    expect(productService.editProduct).not.toHaveBeenCalled();
    expect(productService.getProductById).not.toHaveBeenCalled();
  });
});
