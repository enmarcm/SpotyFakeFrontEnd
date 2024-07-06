import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenreSongPage } from './genre-song.page';

describe('GenreSongPage', () => {
  let component: GenreSongPage;
  let fixture: ComponentFixture<GenreSongPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreSongPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
