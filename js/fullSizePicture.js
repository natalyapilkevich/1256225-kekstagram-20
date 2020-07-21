'use strict';
(function () {
  var MAX_COMMENTS_NUMBER = 5;

  var bigPicture = document.querySelector('.big-picture');
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var commentCount = bigPicture.querySelector('.social__comment-count');

  var createBigPicture = function (photo) {
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    if (photo.comments.length < MAX_COMMENTS_NUMBER) {
      commentCount.textContent = photo.comments.length + ' из ' + photo.comments.length + ' комментариев';
    } else {
      commentCount.textContent = '5 из ' + photo.comments.length + ' комментариев';
    }
    bigPicture.querySelector('.social__caption').textContent = photo.description;
  };

  var bigСommentsList = bigPicture.querySelector('.social__comments');
  bigСommentsList.innerHTML = ' ';

  var createComment = function (commentary) {
    var comment = document.createElement('li');
    comment.classList.add('social__comment');
    bigСommentsList.append(comment);

    var img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = commentary.avatar;
    img.alt = commentary.name;
    img.width = '35';
    img.height = '35';
    comment.append(img);

    var text = document.createElement('p');
    text.classList.add('social__text');
    text.textContent = commentary.message;
    comment.append(text);
  };

  var createCommentsPool = function (commentsPool) {
    if (commentsPool.length < MAX_COMMENTS_NUMBER) {
      for (var i = 0; i < commentsPool.length; i++) {
        createComment(commentsPool[i]);
      }
      commentsLoader.classList.add('hidden');
    } else {
      for (i = 0; i < MAX_COMMENTS_NUMBER; i++) {
        createComment(commentsPool[i]);
      }
      commentsLoader.classList.remove('hidden');
    }
  };


  window.fullSizePicture = {
    bigPicture: bigPicture,
    bigСommentsList: bigСommentsList,
    createBigPicture: createBigPicture,
    createCommentsPool: createCommentsPool,
    commentCount: commentCount
  };

})();
