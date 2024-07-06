import { Pipe, PipeTransform } from '@angular/core';
// import { ArtistInterface } from './path/to/artist-interface.model'; // Adjust the import path as necessary

interface ArtistInterface {
    id: string;
    name: string;
    followers: number;
    gneres: string[];
    urlImage: string;
  }

@Pipe({
  name: 'joinArtists',
  standalone: true,
})
export class JoinArtistsPipe implements PipeTransform {
  transform(artists: ArtistInterface[]): string {
    return artists.map(artist => artist.name).join(', ');
  }
}