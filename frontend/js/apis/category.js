import { Category } from '../helpers/Category.js';
import { store } from '../index.js';

/**
 * call the /categories endpoint to get all categories.
 */
export const fetchCategories = () => {
  fetch('http://localhost:3000/categories', {
    method: 'GET',
  })
    .then((res) => {
      res.json().then((data) => {
        store.setCategories(data.map((d) => new Category(d.id, d.name)));
      });
    })
    .catch((err) => console.error(err));
};

/**
 * call the /categories endpoint to create a new category.
 * @param {string} name
 */
export const createNewCategory = (name) => {
  if (!(name && name.length > 0)) {
    return;
  }

  fetch('http://localhost:3000/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newCategory: name }),
  })
    .then((res) => {
      res.json().then((data) => {
        store.addCategory(new Category(data.id, data.name));
      });
    })
    .catch((err) => console.error(err));
};
