import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LoaderService } from '../loader.service';
import { URL_REQUEST } from 'src/constants';

@Injectable({
  providedIn: 'root',
})
export class SongSearchService {
  constructor(
    private httpClient: HttpClient,
    private loaderService: LoaderService
  ) {}

  private async makeRequest<T>(url: string, options: any): Promise<T> {
    this.loaderService.show();
    try {
      return await firstValueFrom(
        this.httpClient.get<T>(url, { ...options, observe: 'events' }).pipe(
          filter(
            (event: HttpEvent<T>): event is HttpResponse<T> =>
              event instanceof HttpResponse
          ),
          map((response: HttpResponse<T>) => response.body as T)
        )
      );
    } catch (error) {
      // Maneja el error aquí si es necesario
      throw error;
    } finally {
      this.loaderService.hide();
    }
  }

  getSong(idSong: string): Promise<any> {
    this.loaderService.show();
    const myToken = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    return this.makeRequest(`${URL_REQUEST.GET_SONG}/${idSong}`, { headers });
  }

  getTopSongs(): Promise<any> {
    const myToken = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    return this.makeRequest(URL_REQUEST.TOP_SONGS, { headers });
  }

  getArtistInfo(idArtist: string): Promise<any> {
    const myToken = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    return this.makeRequest(`${URL_REQUEST.GET_ARTIST}/${idArtist}`, {
      headers,
    });
  }

  getArtistAlbums(idArtist: string): Promise<any> {
    const myToken = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    return this.makeRequest(
      `${URL_REQUEST.GET_ARTIST_ALBUMS}/${idArtist}?limit=6`,
      { headers }
    );
  }

  getTopArtist(): Promise<any> {
    const myToken = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    return this.makeRequest(URL_REQUEST.GET_ARTISTS, { headers });
  }

  getNewAlbums(): Promise<any> {
    const myToken = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    return this.makeRequest(URL_REQUEST.NEW_ALBUMS, { headers });
  }

  getAlbumInfo(idAlbum: string): Promise<any> {
    const myToken = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    return this.makeRequest(`${URL_REQUEST.GET_ALBUM}/${idAlbum}`, { headers });
  }

  getGenres(): Promise<any> {
    const myToken = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    return this.makeRequest(URL_REQUEST.GET_GENRES, { headers });
  }

  getSongsByGenre(genre: string, page: number = 1): Promise<any> {
    const myToken = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    return this.makeRequest(
      `${URL_REQUEST.GET_SONGS_BY_GENRE}/${genre}?page=${page}`,
      { headers }
    );
  }

  getSongByName(name: string, page: number = 1): Promise<any> {
    const myToken = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    return this.makeRequest(
      `${URL_REQUEST.GET_SONGS_BY_NAME}/${name}?page=${page}`,
      { headers }
    );
  }

  getPlaylists(): Promise<any> {
    const myToken = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    return this.makeRequest(URL_REQUEST.GET_PLAYLISTS, { headers });
  }

  newPlaylist(playlist: any): Promise<any> {
    const myToken = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    this.loaderService.show();
    try {
      return firstValueFrom(
        this.httpClient.post<any>(URL_REQUEST.CRETE_PLAYLIST, playlist, {
          headers,
        })
      );
    } finally {
      this.loaderService.hide();
    }
  }

  deletePlaylist(playlistId: string): Promise<any> {
    const myToken = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    this.loaderService.show();
    try {
      return firstValueFrom(
        this.httpClient.delete<any>(
          `${URL_REQUEST.DELETE_PLAYLIST}/${playlistId}`,
          { headers }
        )
      );
    } finally {
      this.loaderService.hide();
    }
  }

  getPlaylistById(playlistId: string): Promise<any> {
    const myToken = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    return this.makeRequest(`${URL_REQUEST.GET_PLAYLIST}/${playlistId}`, {
      headers,
    });
  }

  uploadSong(song: any): Promise<any> {
    const myToken = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    this.loaderService.show();
    try {
      return firstValueFrom(
        this.httpClient.post<any>(URL_REQUEST.UPLOAD_SONG, song, { headers })
      );
    } finally {
      this.loaderService.hide();
    }
  }

  toggleLike(idSong: string): Promise<any> {
    const myToken = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    return this.makeRequest(`${URL_REQUEST.TOGGLE_LIKE}/${idSong}`, {
      headers,
    });
  }

  getAllLikes(): Promise<any> {
    const myToken = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${myToken}` });
    return this.makeRequest(URL_REQUEST.GET_LIKES, { headers });
  }
}
