'use strict';
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

var photoListElement = document.querySelector('.pictures');
var photoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getMessage = function () {
  var messagesList = '';
  for (var i = 0; i < getRandomNumber(1, 2); i++) {
    messagesList += MESSAGES[getRandomNumber(0, 5)] + ' ';
  }
  return messagesList;
};

var getComment = function () {
  var сomments = [];
  for (var i = 0; i < QUANTITY_OF_PHOTOS; i++) {
    var commentTemplate = {
      avatar: 'img/avatar-' + getRandomNumber(1, QUANTITY_OF_COMMENTATORS_AVATARS) + '.svg',
      message: getMessage(),
      name: NAMES_OF_COMMENTATORS[getRandomNumber(0, NAMES_OF_COMMENTATORS.length - 1)]
    };
    сomments.push(commentTemplate);
  }
  return сomments;
};

var poolOfComments = getComment();

var getCommentsList = function () {
  var commentsList = [];
  for (var i = 0; i < getRandomNumber(1, MAX_COMMENTS_NUMBER); i++) {
    var comment = poolOfComments[getRandomNumber(0, poolOfComments.length - 1)];
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
      likes: getRandomNumber(LIKES_VALUE_MIN, LIKES_VALUE_MAX),
      comments: getCommentsList()
    };
    photos.push(eachPhoto);
  }
  return photos;
};

var listOfPhotos = getPhotos();

var renderPhoto = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  return photoElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < listOfPhotos.length; i++) {
  fragment.appendChild(renderPhoto(listOfPhotos[i]));
}

photoListElement.appendChild(fragment);

document.querySelector('.pictures__title').classList.remove('visually-hidden');

var defaultPhoto = listOfPhotos[0];

var bigPicture = document.querySelector('.big-picture');

var createBigPicture = function (photo) {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = defaultPhoto.description;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
};

createBigPicture(defaultPhoto);

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

for (i = 0; i < defaultPhoto.comments.length; i++) {
  createComment(defaultPhoto.comments[i]);
}

document.querySelector('body').classList.add('modal-open');

bigPicture.classList.remove('hidden');
