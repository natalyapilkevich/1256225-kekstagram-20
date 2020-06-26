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

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < window.data.listOfPhotos.length; i++) {
    fragment.appendChild(renderPhoto(window.data.listOfPhotos[i]));
  }

  photoListElement.appendChild(fragment);

  document.querySelector('.pictures__title').classList.remove('visually-hidden');

})();
