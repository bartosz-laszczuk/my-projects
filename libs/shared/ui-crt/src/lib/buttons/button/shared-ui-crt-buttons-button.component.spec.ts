import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedUiCrtButtonsButtonComponent } from './shared-ui-crt-buttons-button.component';

describe('SharedUiCrtButtonsButtonComponent', () => {
  let component: SharedUiCrtButtonsButtonComponent;
  let fixture: ComponentFixture<SharedUiCrtButtonsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUiCrtButtonsButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedUiCrtButtonsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
