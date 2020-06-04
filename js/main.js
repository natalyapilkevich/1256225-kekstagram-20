'use strict';
var QUANTITY_OF_PHOTOS = 25;
var MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES_OF_COMMENTATORS = ['Эд', 'Фред', 'Сэд', 'Мэд', 'Брэд', 'Рэд'];
var LIKES_VALUE_MIN = 15;
var LIKES_VALUE_MAX = 200;
var photoListElement = document.querySelector('.pictures');
var photoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var getRandomNumber = function (min, max) {
  var number = min + Math.random() * (max + 1 - min);
  return Math.floor(number);
};

var comments = function () {
  var eachComment = [];
  for (var i = 0; i < QUANTITY_OF_PHOTOS; i++) {
    var commentTemplate = {
      avatar: 'img/avatar' + getRandomNumber(1, 6) + '.svg',
      message: MESSAGES[getRandomNumber(0, MESSAGES.length - 1)],
      name: NAMES_OF_COMMENTATORS[getRandomNumber(0, NAMES_OF_COMMENTATORS.length - 1)]
    };
    eachComment.push(commentTemplate);
  }
  return eachComment;
};

var photos = function () {
  var array = [];
  for (var i = 1; i <= QUANTITY_OF_PHOTOS; i++) {
    var eachPhoto = {
      url: 'photos/' + i + '.jpg',
      description: '',
      likes: getRandomNumber(LIKES_VALUE_MIN, LIKES_VALUE_MAX),
      comments: comments()[getRandomNumber(0, QUANTITY_OF_PHOTOS - 1)]
    };
    array.push(eachPhoto);
  }
  return array;
};

photos();

var renderPhoto = function (photo) {
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__comments').textContent = 1;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  return photoElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < photos().length; i++) {
  fragment.appendChild(renderPhoto(photos()[i]));
}

photoListElement.appendChild(fragment);

document.querySelector('.pictures__title').classList.remove('visually-hidden');
