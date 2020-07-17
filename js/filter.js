'use strict';
(function () {
  var MAX_COUNT_RANDOM_PHOTO = 10;
  var photos = [];
  var imageFilter = document.querySelector('.img-filters');
  var defaultOrderButton = imageFilter.querySelector('#filter-default');
  var randomOrderButton = imageFilter.querySelector('#filter-random');
  var discussedOrderButton = imageFilter.querySelector('#filter-discussed');
  var filterButtons = imageFilter.querySelectorAll('.img-filters__button');

  var removeActiveFilter = function () {
    filterButtons.forEach(function (el) {
      if (el.className.includes('img-filters__button--active')) {
        el.classList.remove('img-filters__button--active');
      }
    });
  };

  var removePhotos = function () {
    var picturesSection = document.querySelector('.pictures');
    var pictures = document.querySelectorAll('.picture__img');
    pictures.forEach(function (el) {
      picturesSection.remove(el);
    });
  };


  var shuffle = function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  var makeDefaultOrder = function () {
    removeActiveFilter();
    defaultOrderButton.classList.add('img-filters__button--active');
    removePhotos();
    window.debounce(window.picture.renderGallery(photos.slice()));
  };

  var makeRandomOrder = function () {
    removeActiveFilter();
    randomOrderButton.classList.add('img-filters__button--active');
    removePhotos();
    var randomArray = shuffle(photos.slice()).slice(0, MAX_COUNT_RANDOM_PHOTO);
    window.debounce(window.picture.renderGallery(randomArray));
  };

  var makeDiscussedOrder = function () {
    removeActiveFilter();
    discussedOrderButton.classList.add('img-filters__button--active');
    removePhotos();
    var discussArray = photos.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    window.debounce(window.picture.renderGallery(discussArray));
  };

  var onSuccess = function (data) {
    photos = data;
    imageFilter.classList.remove('img-filters--inactive');
    window.picture.renderGallery(photos);

    defaultOrderButton.addEventListener('click', makeDefaultOrder);
    randomOrderButton.addEventListener('click', makeRandomOrder);
    discussedOrderButton.addEventListener('click', makeDiscussedOrder);
  };

  window.backend.load(onSuccess);
})();
