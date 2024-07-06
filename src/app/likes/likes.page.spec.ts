import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LikesPage } from './likes.page';

describe('LikesPage', () => {
  let component: LikesPage;
  let fixture: ComponentFixture<LikesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LikesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
