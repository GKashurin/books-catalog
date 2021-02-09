import {
	ADD_BOOK,
	DELETE_BOOK,
	UPDATE_BOOK,
} from "../actions/actions"

let books = [

]

export const booksReducer = (state = books, action) => {
	let newBooks;

	switch (action.type) {
		case ADD_BOOK:
			newBooks = [...state, action.payload];
			return newBooks

		case DELETE_BOOK:
			newBooks = [...state];

			newBooks = newBooks.filter(function (book) {
				return book.id !== action.payload
			})
			return newBooks

		case UPDATE_BOOK:
			newBooks = [...state];
			let index = -1;
			for (let i = 0; i < newBooks.length; i++) {
				index++;
				if (newBooks[i].id === action.payload.id) {
					break;
				}
			}
			if (index !== -1) {
				newBooks[index] = action.payload;
				return newBooks;
			}
		// eslint-disable-next-line no-fallthrough
		default: return state
	}
}

// Мы вызываем метод filter() на массиве newBooks(является копией стейта), состоящим из объектов и передаём функцию, которая отрабатывает на каждом элементе этого массива. Внутри функции мы проверяем значение id. Если id элемента не совпадает с тем, по которому кликнул пользователь, то элемент остается в новом массиве. Метод filter(), работая с финальным массивом, включит в него только элементы, на котором отработала функция и который подошел по всем условиям, выдав true.