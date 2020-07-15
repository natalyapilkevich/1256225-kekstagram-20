'use strict';
(function () {
  var onSuccess = function (data) {
    var thumbnailes = document.querySelectorAll('.picture');

    var onThumbnail = function (thumbnail, photo) {
      thumbnail.addEventListener('click', function () {
        window.fullSizePicture.createBigPicture(photo);
        window.fullSizePicture.createCommentsPool(photo);
        openBigPhoto();
      });
    };

    for (var i = 0; i < thumbnailes.length; i++) {
      onThumbnail(thumbnailes[i], data[i]);
    }

    var bigPhotoCancel = document.querySelector('#picture-cancel');

    var onBigPhotoEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeBigPhoto();
      }
    };

    var openBigPhoto = function () {
      window.fullSizePicture.bigPicture.classList.remove('hidden');
      document.querySelector('body').classList.add('modal-open');

      document.addEventListener('keydown', onBigPhotoEscPress);
    };

    var closeBigPhoto = function () {
      window.fullSizePicture.bigPicture.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      window.fullSizePicture.bigСommentsList.innerHTML = ' ';

      document.removeEventListener('keydown', onBigPhotoEscPress);
    };

    bigPhotoCancel.addEventListener('click', function () {
      closeBigPhoto();
    });
  };

  window.load(onSuccess);
})();
