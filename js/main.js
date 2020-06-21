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

var PHOTO_SCALE_VALUE_MIN = '25%';
var PHOTO_SCALE_VALUE_MAX = '100%';

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

// Для одной полноразмерной фотографии

var bigPicture = document.querySelector('.big-picture');

var createBigPicture = function (photo) {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
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

var createCommentsPool = function (photo) {
  for (i = 0; i < photo.comments.length; i++) {
    createComment(photo.comments[i]);
  }
};

// Для всех полноразмерных фотографий

var thumbnailes = document.querySelectorAll('.picture');

var addClickHandler = function (thumbnail, photo) {
  thumbnail.addEventListener('click', function () {
    createBigPicture(photo);
    createCommentsPool(photo);
    openBigPhoto();
  });
};

for (i = 0; i < thumbnailes.length; i++) {
  addClickHandler(thumbnailes[i], listOfPhotos[i]);
}

var bigPhotoCancel = document.querySelector('#picture-cancel');

var onBigPhotoEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPhoto();
  }
};

var openBigPhoto = function () {
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onBigPhotoEscPress);
};

var closeBigPhoto = function () {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  bigСommentsList.innerHTML = ' ';

  document.removeEventListener('keydown', onBigPhotoEscPress);
};


bigPhotoCancel.addEventListener('click', function () {
  closeBigPhoto();
});

// Загрузка изображения и показ формы редактирования

var uploadFile = document.querySelector('#upload-file');
var imageEditingForm = document.querySelector('.img-upload__overlay');
var uploadCancel = imageEditingForm.querySelector('#upload-cancel');
var originalEffect = imageEditingForm.querySelector('input[id=effect-none]');
var effectLevel = imageEditingForm.querySelector('.effect-level');
var hashtagsInput = imageEditingForm.querySelector('.text__hashtags');
var commentInput = imageEditingForm.querySelector('.text__description');

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape' && evt.target !== hashtagsInput && evt.target !== commentInput) {
    evt.preventDefault();
    closePopup();
  }
};

var openPopup = function () {
  imageEditingForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  imageEditingForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscPress);

  uploadFile.value = '';
  originalEffect.checked = true;
  controlValue.value = '100%';
  photoWithEffect.style.transform = 'scale(1)';

  photoWithEffect.className = 'img-upload__preview';
  effectPin.removeEventListener('mouseup', appliesFilter);
};

uploadFile.addEventListener('change', function () {
  openPopup();
  effectLevel.classList.add('hidden');
});

uploadCancel.addEventListener('click', function () {
  closePopup();
});

// Масштабирование изображения

var photoWithEffect = imageEditingForm.querySelector('.img-upload__preview');
var controlSmaller = imageEditingForm.querySelector('.scale__control--smaller');
var controlBigger = imageEditingForm.querySelector('.scale__control--bigger');
var controlValue = imageEditingForm.querySelector('.scale__control--value');

var changeSize = function (sign) {
  controlValue.value = parseInt(controlValue.value, 10) + sign * 25 + '%';
  photoWithEffect.style.transform = 'scale(' + parseInt(controlValue.value, 10) / 100 + ')';
};

controlSmaller.addEventListener('click', function () {
  if (controlValue.value !== PHOTO_SCALE_VALUE_MIN) {
    changeSize(-1);
  }
});

controlBigger.addEventListener('click', function () {
  if (controlValue.value !== PHOTO_SCALE_VALUE_MAX) {
    changeSize(1);
  }
});

// Применение эффекта для изображения

var fieldsetOfEffects = imageEditingForm.querySelector('.img-upload__effects');
var effectPin = imageEditingForm.querySelector('.effect-level__pin');
var effectPinInput = imageEditingForm.querySelector('.effect-level__value');

var filterChangeHandler = function (evt) {
  photoWithEffect.className = 'img-upload__preview effects__preview--' + evt.target.value;
  if (!originalEffect.checked) {
    effectLevel.classList.remove('hidden');
    photoWithEffect.style.filter = '';
  } else {
    effectLevel.classList.add('hidden');
  }
};

fieldsetOfEffects.addEventListener('change', filterChangeHandler);

var appliesFilter = function () {
  if (photoWithEffect.className.includes('chrome')) {
    photoWithEffect.style.filter = 'grayscale(' + effectPinInput.value / 100 + ')';

  } else if (photoWithEffect.className.includes('sepia')) {
    photoWithEffect.style.filter = 'sepia(' + effectPinInput.value / 100 + ')';

  } else if (photoWithEffect.className.includes('marvin')) {
    photoWithEffect.style.filter = 'invert(' + effectPinInput.value + '%)';

  } else if (photoWithEffect.className.includes('phobos')) {
    photoWithEffect.style.filter = 'blur(' + effectPinInput.value * 0.03 + 'px)';

  } else if (photoWithEffect.className.includes('heat')) {
    photoWithEffect.style.filter = 'brightness(' + effectPinInput.value * 0.02 + 1 + ')';

  }
};

effectPin.addEventListener('mouseup', appliesFilter);

// Валидация хэштегов

var space = ' ';

var checkRegular = function (arr, reg) {
  var flag = true;
  for (i = 0; i < arr.length; i++) {
    if (!reg.test(arr[i])) {
      flag = false;
    }
  }
  return flag;
};

var checkLength = function (arr) {
  var flag = true;
  for (i = 0; i < arr.length; i++) {
    if (arr[i].length < 2 || arr[i].length > 20) {
      flag = false;
    }
  }
  return flag;
};

var checkRepeat = function (arr) {
  var flag = true;
  for (i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        return false;
      }
    }
  }
  return flag;
};

var regular = /^#[A-ZА-Я0-9]+$/i;

hashtagsInput.addEventListener('input', function () {
  var hashtagsValue = hashtagsInput.value;
  var hashtags = hashtagsValue.split(space);


  if (checkRegular(hashtags, regular) === false) {
    hashtagsInput.setCustomValidity('Должны быть только цифры и буквы, а начинаться с #');

  } else if (checkLength(hashtags) === false) {
    hashtagsInput.setCustomValidity('Хэштег должен быть меньше, чем из 20 символов');

  } else if (checkRepeat(hashtags) === false) {
    hashtagsInput.setCustomValidity('Не должно быть повторяющихся хэштегов');

  } else if (hashtags.length > 5) {
    hashtagsInput.setCustomValidity('Слишком много, нужно не больше 5 хэштегов');

  } else {
    hashtagsInput.setCustomValidity('');
  }
});

commentInput.addEventListener('input', function () {
  if (commentInput.validity.tooLong) {
    commentInput.setCustomValidity('Комментарий слишком длинный');
  } else {
    commentInput.setCustomValidity('');
  }
});
