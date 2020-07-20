'use strict';
(function () {
  var MAX_COMMENTS_NUMBER = 5;

  var commentsLoaderButton = document.querySelector('.comments-loader');

  var onSuccess = function (data) {
    var thumbnailes = document.querySelectorAll('.picture');

    var onThumbnail = function (thumbnail, photo) {
      thumbnail.addEventListener('click', function () {
        var commentsPool = photo.comments.slice();
        var counter = MAX_COMMENTS_NUMBER;

        window.fullSizePicture.createBigPicture(photo);
        window.fullSizePicture.createCommentsPool(commentsPool);
        commentsPool.splice(0, MAX_COMMENTS_NUMBER);

        openBigPhoto();

        var showComments = function () {
          window.fullSizePicture.createCommentsPool(commentsPool);

          if (commentsPool.length > MAX_COMMENTS_NUMBER) {
            counter += MAX_COMMENTS_NUMBER;
            window.fullSizePicture.commentCount.textContent = counter + ' из ' + photo.comments.length + ' комментариев';
          } else {
            window.fullSizePicture.commentCount.textContent = photo.comments.length + ' из ' + photo.comments.length + ' комментариев';
          }
          commentsPool.splice(0, MAX_COMMENTS_NUMBER);
        };
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
