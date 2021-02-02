import refs from './refs';

export default class FetchQueryApiService {
  constructor() {
    this.massOfQuery = [];
    this.massOfMovies = [];
    this.url = '';
    this.page = 1;
    this.totalHits = 0;
    this.searchQuery = '';
    this.full_URL_Image = 'https://image.tmdb.org/t/p/w220_and_h330_face';
    this.apiKey = '4f9c0875fb3e036244791a873d8888e9';
    this.tokenKey =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZjljMDg3NWZiM2UwMzYyNDQ3OTFhODczZDg4ODhlOSIsInN1YiI6IjYwMTFjZjA5YTM1YzhlMDAzZjYxOWNkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jSlPq1Oju09IIGkdFM70pixzD_zw1JN2kt1u4_R-OzU';
  }
  async fetchArticles(searchQuery) {
    if (searchQuery != this.searchQuery) {
      refs.ul.innerHTML = '';
    }
    if (searchQuery) {
      this.url = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${searchQuery}&page=${this.page}&include_adult=false`;
    } else {
      this.url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=${this.page}`;
    }

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
    };
    return (
      fetch(this.url, options)
        .then(res => res.json())
        .then(data => {
          data.results.map(elem => {
            this.massOfQuery.push(elem.id);
          });
          return this.massOfQuery;
        })
        .then(data => {
          return [
            data.map(elem => {
              fetch(
                `https://api.themoviedb.org/3/movie/${elem}?api_key=${this.apiKey}&language=en-US`,
                options,
              )
                .then(res => res.json())
                .then(data => {
                  return this.massOfMovies.push(data);
                });
            }),
          ];
        })
        .then(() => {
          return this.massOfMovies;
        })
        .catch(err => console.log(err))
    );
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// data.map(elem => {
//   console.log(elem);
//   return [
//     this.massOfOneMovies.push({
//       urlImg: this.full_URL_Image + elem.backdrop_path,
//       genger: elem.genres.map(el => {
//         el.name;
//       }),
//       titleOrig: elem.original_title,
//       urlPost: this.full_URL_Image + elem.poster_path,
//       title: elem.title,
//       date: elem.release_date,
//       overview: elem.overview,
//       popularity: elem.popularity,
//       vote_average: elem.vote_average,
//       vote_count: elem.vote_count,
//     }),
//   ];
// }),
