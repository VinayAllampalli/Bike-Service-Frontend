import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailogueComponent } from './dailogue.component';

describe('DailogueComponent', () => {
  let component: DailogueComponent;
  let fixture: ComponentFixture<DailogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
