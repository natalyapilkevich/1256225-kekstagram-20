'use strict';
(function () {
  var QUANTITY_OF_PHOTOS = 25;
  var MESSAGES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var NAMES_OF_COMMENTATORS = ['Эд', 'Фред', 'Сэд', 'Мэд', 'Брэд', 'Рэд'];
  var LIKES_VALUE_MIN = 15;
  var LIKES_VALUE_MAX = 200;
  var MAX_COMMENTS_NUMBER = 6;
  var QUANTITY_OF_COMMENTATORS_AVATARS = 6;

  var getMessage = function () {
    var messagesList = '';
    for (var i = 0; i < window.getRandomNumber(1, 2); i++) {
      messagesList += MESSAGES[window.getRandomNumber(0, 5)] + ' ';
    }
    return messagesList;
  };

  var getComment = function () {
    var сomments = [];
    for (var i = 0; i < QUANTITY_OF_PHOTOS; i++) {
      var commentTemplate = {
        avatar: 'img/avatar-' + window.getRandomNumber(1, QUANTITY_OF_COMMENTATORS_AVATARS) + '.svg',
        message: getMessage(),
        name: NAMES_OF_COMMENTATORS[window.getRandomNumber(0, NAMES_OF_COMMENTATORS.length - 1)]
      };
      сomments.push(commentTemplate);
    }
    return сomments;
  };

  var poolOfComments = getComment();

  var getCommentsList = function () {
    var commentsList = [];
    for (var i = 0; i < window.getRandomNumber(1, MAX_COMMENTS_NUMBER); i++) {
      var comment = poolOfComments[window.getRandomNumber(0, poolOfComments.length - 1)];
      commentsList.push(comment);
    }
    return commentsList;
  };

  var getPhotos = function () {
    var photos = [];
    for (var i = 1; i <= QUANTITY_OF_PHOTOS; i++) {
      var eachPhoto = {
        url: 'photos/' + i + '.jpg',
        description: '',
        likes: window.getRandomNumber(LIKES_VALUE_MIN, LIKES_VALUE_MAX),
        comments: getCommentsList()
      };
      photos.push(eachPhoto);
    }
    return photos;
  };

  var listOfPhotos = getPhotos();
  window.data = {
    listOfPhotos: listOfPhotos
  };

})();
