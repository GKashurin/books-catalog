import {
	ADD_BOOK,
	DELETE_BOOK, SET_INITIAL_BOOK,
	UPDATE_BOOK,
} from "../actions/actions"

let initialState = []

export const booksReducer = (state = initialState, action) => {
	let newBooks;

	switch (action.type) {
		case ADD_BOOK:
			newBooks = [...state, action.payload];
			return newBooks

		case SET_INITIAL_BOOK:
			newBooks = action.payload
			return newBooks;

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
					book.title = action.payload.title
					book.author = action.payload.author
					book.year = action.payload.year
					book.ISBN = action.payload.ISBN	}
				return book
			})
			return newBooks

		default: return state
	}
}