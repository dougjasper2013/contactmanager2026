import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecontactsComponent } from './updatecontacts.component';

describe('UpdatecontactsComponent', () => {
  let component: UpdatecontactsComponent;
  let fixture: ComponentFixture<UpdatecontactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatecontactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatecontactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
