import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { HeaderComponent } from './header.component';
import { ProductsService } from 'src/app/shared/services/products.service';
import { AddProductDialogComponent } from '../../../components/add-product-dialog/add-product-dialog.component';

class MockProductsService {
  addProduct = jasmine.createSpy('addProduct').and.returnValue(of(true));
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: MatDialog, useValue: dialogSpy },
        { provide: ProductsService, useClass: MockProductsService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    mockDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog when Add a new product is clicked', () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', { 'afterClosed': of(null) });
    mockDialog.open.and.returnValue(dialogRefSpyObj);

    component.openDialog();

    expect(mockDialog.open).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
  });


  it('should call addProduct method of ProductsService when dialog is closed with result', () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpyObj.afterClosed.and.returnValue(of({}));
    mockDialog.open.and.returnValue(dialogRefSpyObj);

    component.openDialog();

    expect(mockDialog.open).toHaveBeenCalled();
    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    dialogRefSpyObj.afterClosed().subscribe(() => {
      expect(component.productService.addProduct).toHaveBeenCalled();
    });
  });

});
