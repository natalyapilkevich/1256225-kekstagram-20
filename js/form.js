'use strict';
(function () {
  var PHOTO_SCALE_VALUE_MIN = '25%';
  var PHOTO_SCALE_VALUE_MAX = '100%';
  var MAX_EFFECT_SLIDER_LENGTH = 455;
  // Загрузка изображения и показ формы редактирования

  var uploadFile = document.querySelector('#upload-file');
  var imageEditingForm = document.querySelector('.img-upload__overlay');
  var photoWithEffect = imageEditingForm.querySelector('.img-upload__preview');
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
    photoWithEffect.style.filter = '';

    hashtagsInput.value = '';
    commentInput.value = '';

  };

  uploadFile.addEventListener('change', function () {
    openPopup();
    effectLevel.classList.add('hidden');
  });

  uploadCancel.addEventListener('click', function () {
    closePopup();
  });

  // Масштабирование изображения

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
  var effectDepth = imageEditingForm.querySelector('.effect-level__depth');


  var onFilter = function (evt) {
    photoWithEffect.className = 'img-upload__preview effects__preview--' + evt.target.value;
    if (!originalEffect.checked) {
      effectLevel.classList.remove('hidden');
      photoWithEffect.style.filter = '';
      effectPin.style.left = '100%';
      effectDepth.style.width = '100%';
    } else {
      effectLevel.classList.add('hidden');
    }
  };

  fieldsetOfEffects.addEventListener('change', onFilter);

  var appliesFilter = function (value) {
    if (photoWithEffect.className.includes('chrome')) {
      photoWithEffect.style.filter = 'grayscale(' + value / 100 + ')';

    } else if (photoWithEffect.className.includes('sepia')) {
      photoWithEffect.style.filter = 'sepia(' + value / 100 + ')';

    } else if (photoWithEffect.className.includes('marvin')) {
      photoWithEffect.style.filter = 'invert(' + value + '%)';

    } else if (photoWithEffect.className.includes('phobos')) {
      photoWithEffect.style.filter = 'blur(' + value * 0.03 + 'px)';

    } else if (photoWithEffect.className.includes('heat')) {
      photoWithEffect.style.filter = 'brightness(' + value * 0.02 + 1 + ')';
    }
  };

  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: evt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: evt.clientY
      };

      if (parseInt(effectPin.style.left, 10) < 0) {
        effectPin.style.left = '0';
        shift.x = 0;
        onMouseUp(moveEvt);
      } else if (parseInt(effectPin.style.left, 10) > MAX_EFFECT_SLIDER_LENGTH) {
        effectPin.style.left = MAX_EFFECT_SLIDER_LENGTH + 'px';
        shift.x = 0;
        onMouseUp(moveEvt);
      } else {
        effectPin.style.left = (effectPin.offsetLeft - shift.x) + 'px';
      }

      var powerOfEffect = parseInt(effectPin.style.left, 10) * 100 / MAX_EFFECT_SLIDER_LENGTH;

      appliesFilter(powerOfEffect);

      effectDepth.style.width = powerOfEffect + '%';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      effectPin.removeEventListener('mousemove', onMouseMove);
      effectPin.removeEventListener('mouseup', onMouseUp);
    };

    effectPin.addEventListener('mousemove', onMouseMove);
    effectPin.addEventListener('mouseup', onMouseUp);

  });

  // Валидация хэштегов

  var space = ' ';

  var checkRegular = function (arr, reg) {
    var flag = true;
    for (var i = 0; i < arr.length; i++) {
      if (!reg.test(arr[i])) {
        flag = false;
      }
    }
    return flag;
  };

  var checkLength = function (arr) {
    var flag = true;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].length < 2 || arr[i].length > 20) {
        flag = false;
      }
    }
    return flag;
  };

  var checkRepeat = function (arr) {
    var flag = true;
    for (var i = 0; i < arr.length; i++) {
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

  // Отправка формы

  var main = document.querySelector('main');

  var successMessage = document.querySelector('#success')
  .content
  .querySelector('.success');

  var errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

  var onMessageEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  };

  var closeMessage = function () {
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onMessageEscPress);
    if (main.contains(successMessage)) {
      successMessage.parentNode.removeChild(successMessage);
    } else if (main.contains(errorMessage)) {
      errorMessage.parentNode.removeChild(errorMessage);
    }
  };

  var getMessage = function (message) {
    closePopup();
    main.insertAdjacentElement('beforeEnd', message);
    document.addEventListener('keydown', onMessageEscPress);
  };

  var onUpload = function () {
    getMessage(successMessage);
    document.addEventListener('click', function () {
      closeMessage();
    });
  };

  var onDenial = function () {
    getMessage(errorMessage);
    document.addEventListener('click', function () {
      closeMessage();
    });
  };

  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), onUpload, onDenial);
    evt.preventDefault();
  });
})();
