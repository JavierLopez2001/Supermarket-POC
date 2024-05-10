import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { Router, ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs'; // For mocking ActivatedRoute
import { MatInput, MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const routerMock = { navigateByUrl: jasmine.createSpy('navigateToUrl') };
    const activatedRouteMock = {
      params: of({ searchItem: '' }), // Initial empty search term
    };

    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        MatInputModule,
        FormsModule
      ],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should update searchItem on input change', () => {
    const input = fixture.debugElement.query(By.css('input'));
    const inputElement = input.nativeElement as HTMLInputElement;

    inputElement.value = 'test';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.searchItem).toBe('test');
  });

  it('should call router.navigateByUrl on search button click with valid input', () => {
    const input = fixture.debugElement.query(By.css('input'));
    const inputElement = input.nativeElement as HTMLInputElement;
    const button = fixture.debugElement.query(By.css('button'));

    inputElement.value = 'valid_search';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    button.nativeElement.click();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/search/valid_search');
  });

  it('should not call router.navigateByUrl on search button click with empty input', () => {
    const button = fixture.debugElement.query(By.css('button'));

    button.nativeElement.click();

    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });
});
