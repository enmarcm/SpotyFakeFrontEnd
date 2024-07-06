import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaylistItemPage } from './playlist-item.page';

describe('PlaylistItemPage', () => {
  let component: PlaylistItemPage;
  let fixture: ComponentFixture<PlaylistItemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
