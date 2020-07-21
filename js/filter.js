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
    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (el) {
      picturesSection.removeChild(el);
    });
  };

  var mix = function (arr) {
    var randomPhoto = [];
    for (var i = MAX_COUNT_RANDOM_PHOTO; i > 0; i--) {
      var j = window.getRandomNumber(0, arr.length - 1);
      randomPhoto.push(arr[j]);
      arr.splice(j, 1);
    }
    return randomPhoto;
  };

  var changeFilter = function (button, data) {
    removeActiveFilter();
    button.classList.add('img-filters__button--active');
    removePhotos();
    window.debounce(window.picture.renderGallery(data));
    window.gallery.onSuccess(data);
  };

  var makeDefaultOrder = function () {
    var defaultOrderPhotos = photos.slice();
    changeFilter(defaultOrderButton, defaultOrderPhotos);
  };

  var makeRandomOrder = function () {
    var randomOrderPhotos = mix(photos.slice());
    changeFilter(randomOrderButton, randomOrderPhotos);
  };

  var makeDiscussedOrder = function () {
    var discussOrderPhotos = photos.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    changeFilter(discussedOrderButton, discussOrderPhotos);
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
