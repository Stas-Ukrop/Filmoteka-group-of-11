import './sass/main.scss';
import refs from './js/refs';
import detailsPage from './templates/detailsPage.hbs';
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import FetchQueryApiService from './js/service.js';


const fetchQueryApiService = new FetchQueryApiService();
fetchQueryApiService
  .fetchArticles().then(data => console.log(data))
