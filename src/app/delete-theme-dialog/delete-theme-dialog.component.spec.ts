import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteThemeDialogComponent } from './delete-theme-dialog.component';

describe('DeleteThemeDialogComponent', () => {
  let component: DeleteThemeDialogComponent;
  let fixture: ComponentFixture<DeleteThemeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteThemeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteThemeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
