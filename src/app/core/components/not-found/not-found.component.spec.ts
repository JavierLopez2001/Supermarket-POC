import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundComponent } from './not-found.component';
import { RouterModule } from '@angular/router';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotFoundComponent],
      imports: [RouterModule.forRoot([])]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display notFoundMessage when visible is true', () => {
    component.visible = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toContain('Nothing found');
  });

  it('should not display notFoundMessage when visible is false', () => {
    component.visible = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).not.toContain('Nothing found');
  });

  it('should display resetLinkText and resetLinkRoute when visible is true', () => {
    component.visible = true;
    component.resetLinkText = 'Test Link';
    component.resetLinkRoute = '/test';
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).toContain('Test Link');
    expect(fixture.nativeElement.innerHTML).toContain('/test');
  });
});
