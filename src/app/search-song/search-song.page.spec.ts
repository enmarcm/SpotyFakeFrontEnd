import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchSongPage } from './search-song.page';

describe('SearchSongPage', () => {
  let component: SearchSongPage;
  let fixture: ComponentFixture<SearchSongPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSongPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
