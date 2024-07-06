// export const BASE_URL = "http://localhost:7878"
export const BASE_URL = "https://spotyfakebackend-production.up.railway.app"

export enum URL_REQUEST{
    LOGIN = `${BASE_URL}/auth/login`,
    GET_SONG = `${BASE_URL}/songs/getById`,
    TOP_SONGS = `${BASE_URL}/songs/top`,
    GET_ARTIST = `${BASE_URL}/artist/getId`,
    GET_ARTISTS = `${BASE_URL}/artist/getAll`,
    GET_ARTIST_ALBUMS = `${BASE_URL}/album/artist`,
    NEW_ALBUMS = `${BASE_URL}/album/top`,
    GET_ALBUM = `${BASE_URL}/album/getId`,
    GET_GENRES = `${BASE_URL}/songs/genres`,
    GET_SONGS_BY_GENRE = `${BASE_URL}/songs/getByGenre`,
    GET_SONGS_BY_NAME = `${BASE_URL}/songs`,
    GET_PLAYLISTS = `${BASE_URL}/playlist/user`,
    CRETE_PLAYLIST = `${BASE_URL}/playlist/create`,
    DELETE_PLAYLIST = `${BASE_URL}/playlist/delete`,
    GET_PLAYLIST = `${BASE_URL}/playlist/getById`,
    REGISTER = `${BASE_URL}/auth/register`,
    OBTAIN_DATA_USER = `${BASE_URL}/profile/info`,
    UPDATE_DATA_USER = `${BASE_URL}/profile/update`,
    DELETE_USER = `${BASE_URL}/profile/delete`,
    UPLOAD_SONG = `${BASE_URL}/songs/add`,
}

export const BASE_IMAGE_DEFAULT = "https://img.freepik.com/vector-gratis/gradiente-azul-rosa_78370-260.jpg"