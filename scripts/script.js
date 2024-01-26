// document.addEventListener('DOMContentLoaded', () => {
  let testForm = document.querySelectorAll('.test-form')
  let testFormActive = document.querySelector('.test-form--active')

  let testFormItem = document.querySelectorAll('.test-form__item')

  let testFormBtn = document.querySelectorAll('.test-form__button')

  let resultBlock = document.querySelector('.result-block')

  let arrayAnswers = []

  testFormItem.forEach(function(elem) {
    elem.addEventListener('click', function() {
      this.classList.add('test-form__item--active')
      removeActiveFormOtherItems(this)

      testFormIn = this.closest('.test-form').querySelector('.test-form__button')
      if(!testFormIn.classList.contains('test-form__button--visible')) {
        testFormIn.classList.add('test-form__button--visible')
      }

      let btnInThisTestForm = this.closest('.test-form').querySelector('.test-form__button')
      btnInThisTestForm.scrollIntoView({behavior: "smooth"});
    })
  })
// });

// Функция для обработки клика
function removeActiveFormOtherItems(itemNotActive) {
  // Получаем соседние элементы
  var siblings = Array.from(itemNotActive.parentNode.children);

  // Удаляем класс "test-form__item--active" у соседних элементов
  siblings.forEach(function(sibling) {
    if (sibling !== itemNotActive) {
      sibling.classList.remove('test-form__item--active');
    }
  }, itemNotActive);
}

testFormBtn.forEach(function(elem) {
  elem.addEventListener('click', function() {

    if(this.classList.contains('test-form__button--lego')) {
      let parentTestBlock = this.closest('.test-block--active') 
      parentTestBlock.classList.remove('test-block--active')
      parentTestBlock.nextElementSibling.classList.add('test-block--active')
    } else {
      let activeItem = this.closest('.test-form').querySelector('.test-form__item--active')
      let activeItemVariant = activeItem.getAttribute('data-variant')
  
      arrayAnswers.push(activeItemVariant)
  
      let parentTestBlock = this.closest('.test-block--active') 
      parentTestBlock.classList.remove('test-block--active')
  
      if (parentTestBlock.nextElementSibling) {
        parentTestBlock.nextElementSibling.classList.add('test-block--active')
      } else {
        resultBlock.classList.add('result-block--visible')
        howMuchZnach(arrayAnswers)
      }
    }
  })
})

let howMuchZnach = function(array) {
  // Создаем объект для отслеживания количества встреч каждого значения
  let count = {};

  // Подсчитываем количество каждого значения в массиве
  array.forEach(function(item) {
    if (count[item]) {
      count[item] += 1;
    } else {
      count[item] = 1;
    }
  });

  // Находим наибольшее количество встреч
  let maxCount = 0;
  let maxValue;
  for (let item in count) {
    if (count[item] > maxCount) {
      maxCount = count[item];
      maxValue = item;
    }
  }

  console.log("Итоговый массив:", array);
  console.log("Самое часто встречающееся значение:", maxValue);
  console.log("Количество встреч:", maxCount);

  resultBlock.querySelector('.result-open--' + maxValue).classList.add('result-open--visible')
}

document.querySelector('.test-form__button--re').addEventListener('click', function() {
  arrayAnswers.length = 0;
  let testFormItemActive = document.querySelectorAll('.test-form__item--active')

  let parentTestBlock = this.closest('.result-block--visible') 
  parentTestBlock.classList.remove('result-block--visible')

  let testFormFirstQuestion = document.querySelector('.test-block--1')
  testFormFirstQuestion.classList.add('test-block--active')

  let resultBlockVisible = document.querySelector('.result-open--visible')
  resultBlockVisible.classList.remove('result-open--visible')

  testFormItemActive.forEach(function(el) {
    el.classList.remove('test-form__item--active')
  })
})
