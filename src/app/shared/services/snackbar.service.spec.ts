import { TestBed } from "@angular/core/testing";
import { SnackbarService } from "./snackbar.service";
import { MatSnackBar } from "@angular/material/snack-bar";

describe('SnackbarService', () => {
  let service: SnackbarService;
  let matSnackBar: MatSnackBar;

  const mockMatSnackBar = {
    open: () => {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        SnackbarService,
        { provide: MatSnackBar, useValue: mockMatSnackBar }
      ]
    });
    service = TestBed.inject(SnackbarService);
    matSnackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('calls the MatSnackBar open method with arg', () => {
    const matSnackBarSpy = spyOn(matSnackBar, 'open').and.stub();

    service.showSnackBar('arg');

    expect(matSnackBarSpy.calls.count()).toBe(1);

    const args = matSnackBarSpy.calls.argsFor(0);
    expect(args[0]).toBe('arg');
  });
});
