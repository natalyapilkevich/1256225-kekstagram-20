'use strict';
(function () {
  var MAX_COMMENTS_NUMBER = 5;

  var commentsLoaderButton = document.querySelector('.comments-loader');

  var onSuccess = function (data) {
    var thumbnailes = document.querySelectorAll('.picture');
    var displayedСomments = [];
    var counter = MAX_COMMENTS_NUMBER;
    var photoComments = [];

    var showComments = function () {
      window.fullSizePicture.createCommentsPool(displayedСomments);

      if (displayedСomments.length > MAX_COMMENTS_NUMBER) {
        counter += MAX_COMMENTS_NUMBER;
        window.fullSizePicture.commentCount.textContent = counter + ' из ' + photoComments.length + ' комментариев';
      } else {
        window.fullSizePicture.commentCount.textContent = photoComments.length + ' из ' + photoComments.length + ' комментариев';
      }
      displayedСomments.splice(0, MAX_COMMENTS_NUMBER);
    };

    var onThumbnail = function (thumbnail, photo) {
      thumbnail.addEventListener('click', function () {
        photoComments = photo.comments;
        displayedСomments = photo.comments.slice();

        window.fullSizePicture.createBigPicture(photo);
        window.fullSizePicture.createCommentsPool(displayedСomments);
        displayedСomments.splice(0, MAX_COMMENTS_NUMBER);

        openBigPhoto();

        commentsLoaderButton.addEventListener('click', showComments);
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
      commentsLoaderButton.removeEventListener('click', showComments);
      counter = MAX_COMMENTS_NUMBER;
    };

    bigPhotoCancel.addEventListener('click', function () {
      closeBigPhoto();
    });
  };

  window.backend.load(onSuccess);

  window.gallery = {
    onSuccess: onSuccess
  };
})();
