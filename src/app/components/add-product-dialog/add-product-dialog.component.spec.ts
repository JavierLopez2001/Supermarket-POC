import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProductDialogComponent } from './add-product-dialog.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockSnackbarService {
  showSnackBar = jasmine.createSpy('showSnackBar');
}

describe('AddProductDialogComponent', () => {
  let component: AddProductDialogComponent;
  let fixture: ComponentFixture<AddProductDialogComponent>;
  let mockDialogRef: any;
  let mockSnackbarService: MockSnackbarService;

  beforeEach(async () => {
    mockDialogRef = {
      close: jasmine.createSpy('close')
    };

    mockSnackbarService = new MockSnackbarService();

    await TestBed.configureTestingModule({
      declarations: [AddProductDialogComponent],
      imports: [
        MatDialogModule,
        FormsModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: SnackbarService, useValue: mockSnackbarService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog when onNoClick is called', () => {
    component.onNoClick();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should show snackbar and not close the dialog when onSubmit is called with invalid data', () => {
    mockSnackbarService.showSnackBar.and.callFake(() => { });
    component.product = { name: '', price: 0.0, origin: '', time: '', image: '', favorite: false };
    component.onSubmit();
    expect(mockSnackbarService.showSnackBar).toHaveBeenCalledWith("There are invalid fields");
    expect(mockDialogRef.close).not.toHaveBeenCalled();
  });

  it('should close the dialog with product data when onSubmit is called with valid data', () => {
    mockSnackbarService.showSnackBar.and.callFake(() => { });
    component.product = { name: 'Test Product', price: 10, origin: 'Test Origin', time: 'Test Time', image: 'Test Image', favorite: false };
    component.onSubmit();
    expect(mockDialogRef.close).toHaveBeenCalledWith(component.product);
  });
});
