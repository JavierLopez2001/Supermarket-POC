import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { SnackbarService } from './snackbar.service';
import { Product } from '../models/prodcut.model';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  let snackbarService: jasmine.SpyObj<SnackbarService>;

  beforeEach(() => {
    const snackbarSpy = jasmine.createSpyObj('SnackbarService', ['show']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService,
        { provide: SnackbarService, useValue: snackbarSpy }
      ]
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
    snackbarService = TestBed.inject(SnackbarService) as jasmine.SpyObj<SnackbarService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return a product by id', () => {
    const mockProduct: Product = { id: 1, name: 'Test Product', price: 100, favorite: false, time: '2023-04-01', origin: 'Local', image: 'test.jpg' };
    service.getProductById(1).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/1`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockProduct);
  });


  it('should add a product', () => {
    const mockProduct: Product = { id: 3, name: 'New Test Product', price: 150, favorite: false, time: '2023-04-03', origin: 'Local', image: 'test3.jpg' };
    service.addProduct(mockProduct).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(mockProduct);

    const getAllReq = httpMock.expectOne(service.apiUrl);
    expect(getAllReq.request.method).toEqual('GET');
    getAllReq.flush([mockProduct]);
  });



  it('should add a product', () => {
    const mockProduct: Product = { id: 3, name: 'New Test Product', price: 150, favorite: false, time: '2023-04-03', origin: 'Local', image: 'test3.jpg' };
    service.addProduct(mockProduct).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(service.apiUrl);
    expect(req.request.method).toEqual('POST');
    req.flush(mockProduct);

    const getAllReq = httpMock.expectOne(service.apiUrl);
    expect(getAllReq.request.method).toEqual('GET');
    getAllReq.flush([mockProduct]);
  });


  it('should edit a product', () => {
    const mockProduct: Product = { id: 1, name: 'Updated Test Product', price: 150, favorite: true, time: '2023-04-04', origin: 'Imported', image: 'updated.jpg' };
    service.editProduct(1, mockProduct).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/1`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockProduct);

    const getAllReq = httpMock.expectOne(service.apiUrl);
    expect(getAllReq.request.method).toEqual('GET');
    getAllReq.flush([mockProduct]);
  });



  it('should delete a product', () => {
    const mockProduct: Product = { id: 1, name: 'Test Product', price: 100, favorite: false, time: '2023-04-01', origin: 'Local', image: 'test.jpg' };
    service.delete(1).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/1`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(mockProduct);

    const getAllReq = httpMock.expectOne(service.apiUrl);
    expect(getAllReq.request.method).toEqual('GET');
    getAllReq.flush([mockProduct]);
  });

});
