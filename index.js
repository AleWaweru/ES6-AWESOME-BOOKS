import Book, { newTitle, newAuthor, booksArray } from './modules/books.js';

import {
  navList, navAdd, navContact, listSection, addANewSection, contactSection,
} from './modules/navlist.js';

import { DateTime } from './modules/luxon.js';

window.addEventListener('load', () => {
  if (localStorage.getItem('added-books')) {
    booksArray = JSON.parse(localStorage.getItem('added-books'));
    Book.render();
  }
});

const addButton = document.querySelector('.add-button');

const alertMessage = document.querySelector('.alert-message');
addButton.addEventListener('click', () => {
  let theBookAlreadyExists = false;
  for (let i = 0; i < booksArray.length; i += 1) {
    if (booksArray[i].title === newTitle.value && booksArray[i].author === newAuthor.value) {
      theBookAlreadyExists = true;
      alertMessage.innerHTML = 'That book already exists, please add another title or author';
      newTitle.addEventListener('click', () => {
        newTitle.value = '';
      });
      newAuthor.addEventListener('click', () => {
        newAuthor.value = '';
      });
    }
  }
  if (!theBookAlreadyExists) {
    Book.addBook();
    alertMessage.innerHTML = '';
  }
  Book.render();
});

navList.addEventListener('click', () => {
  listSection.classList.remove('hide');
  addANewSection.classList.add('hide');
  contactSection.classList.add('hide');
});

navAdd.addEventListener('click', () => {
  listSection.classList.add('hide');
  addANewSection.classList.remove('hide');
  contactSection.classList.add('hide');
});

navContact.addEventListener('click', () => {
  listSection.classList.add('hide');
  addANewSection.classList.add('hide');
  contactSection.classList.remove('hide');
});

setInterval(() => {
  const currentDate = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
  document.getElementById('showDate').innerHTML = currentDate;
}, (1000));
