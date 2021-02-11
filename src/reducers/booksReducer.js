import {
	ADD_BOOK,
	DELETE_BOOK,
	UPDATE_BOOK,
} from "../actions/actions"

let initialState = [
	{
		id: '',
		values: {
			title:"Учение Дона Хуана",
			author:"Карлос Кастанеда",
			year:"2000",
			ISBN:"a78a-654",
		}
	}
]
//сделать стейт объектом

export const booksReducer = (state = initialState, action) => {
	let newBooks;

	switch (action.type) {
		case ADD_BOOK:
			newBooks = [...state, action.payload];
			return newBooks

		case DELETE_BOOK:
			newBooks = [...state];
			newBooks = newBooks.filter(function(book) {
				return book.id !== action.payload
			})
			return newBooks

		case UPDATE_BOOK:
			newBooks = state;
			newBooks.map(function(book) {
				if(book.id === action.payload.id){
					book.values.title = action.payload.title
					book.values.author = action.payload.author
					book.values.year = action.payload.year
					book.values.ISBN = action.payload.ISBN	}
				return book
			})
			return newBooks

		default: return state
	}
}

// Я вызываю метод filter() на массиве newBooks(является копией стейта), состоящим из объектов и передаю функцию, которая отрабатывает на каждом элементе этого массива. Внутри функции проверяею значение id. Если id элемента не совпадает с тем, по которому кликнул пользователь, то элемент остается в новом массиве. Метод filter(), работая с финальным массивом, включит в него только элементы, на котором отработала функция и который подошел по всем условиям, выдав true.