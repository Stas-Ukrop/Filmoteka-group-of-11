import detailsPage from './template/detailsPage.hbs';

function newImg() {
    let images = document.querySelectorAll('img');
    let img1 = images[images.length - 1];
  
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };
  
    function handleImg(myLiImg, observer) {
      if (myLiImg[myLiImg.length - 1].intersectionRatio === 1) {
        if (refs.totalHit != document.querySelectorAll('li').length) {
            FetchQueryApiService.incrementPage();
            FetchQueryApiService.fetchArticles().then(({ hits }) => {
            appendArticlesMarkup(hits);
            observer.disconnect();
            return;
          });
        }
      }
    }
    let observer = new IntersectionObserver(handleImg, options);
    if (img1) {
      observer.observe(img1);
    } else {
      errorNotification(
        '"нихрена" understand.',
        'Please enter a more "конкретно)" query!',
      );
    }
  }

  function appendArticlesMarkup(articles) {
    refs.outputText.insertAdjacentHTML('beforeend', detailsPage(articles));
    newImg();
  }

  function clearArticlesContainer() {
    refs.outputText.innerHTML = '';
  }
  