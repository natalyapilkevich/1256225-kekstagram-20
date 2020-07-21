'use strict';
(function () {
  var photoListElement = document.querySelector('.pictures');
  var photoTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

  var renderPhoto = function (photo) {
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    return photoElement;
  };

  var renderGallery = function (data) {
    var fragment = document.createDocumentFragment();

    data.forEach(function (el) {
      fragment.appendChild(renderPhoto(el));
    });


    photoListElement.appendChild(fragment);
    photoListElement.querySelector('.pictures__title').classList.remove('visually-hidden');
  };

  window.picture = {
    renderGallery: renderGallery
  };

})();
