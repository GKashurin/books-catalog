import firebase from "firebase";

// авторизация
export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export const FETCH_USERS_REQUEST = 'FETCH_USER_REQUEST'
export const FETCH_USERS_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USERS_FAILURE = 'FETCH_USER_FAILURE'

export const fetchUserRequest = (props) => ({type: FETCH_USERS_REQUEST, payload: props});
export const fetchUserSuccess = payload => ({type: FETCH_USERS_SUCCESS, payload});
export const fetchUserFailure = error => ({type: FETCH_USERS_FAILURE, error});

export const logIn = (props) => ({ type: LOG_IN, payload: props});
export const logOut = () => ({ type: LOG_OUT });

// добавление, удаление, редактирование книги
export const ADD_BOOK = "ADD_BOOK";
export const DELETE_BOOK = "DELETE_BOOK";
export const UPDATE_BOOK = "UPDATE_BOOK";
export const SET_INITIAL_BOOK = "SET_INITIAL_BOOK";

export const addBook = book => ({type: ADD_BOOK, payload: book});
export const deleteBook = bookId => ({type: DELETE_BOOK, payload: bookId});
export const updateBook = book => ({type: UPDATE_BOOK, payload: book});
export const setInitialBook = book => ({type: SET_INITIAL_BOOK, payload: book});

//работа с БД fireBase
export const signInByFirebase = (email, password) => (dispatch) => {
	firebase.auth().signInWithEmailAndPassword(email, password)
		.then(userCredential => {dispatch(logIn(userCredential.user))})
		.catch(error => console.log(error))
}

export const regisrationByFirebase = (email, password) => (dispatch) => {
	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(userCredential => {dispatch(logIn(userCredential.user))})
		.catch(error => console.log(error))
}

export const initialiseBooks = () => (dispatch) => {
	firebase.firestore().collection('books').get().then((response) => {
		dispatch(setInitialBook(response.docs?.map(item => {
			const data = item.data();
			return { ...data, id: item.id}
		})))
	});
}

export const addBookToFirebase = (book) => (dispatch) => {
	firebase.firestore().collection('books').add(book).then((value) => {
		dispatch(addBook({ id: value.id, ...book }))
	}).catch(err => console.log(err))
}

export const removeBookFromFirebase = (book) => (dispatch) => {
	firebase.firestore().collection('books').doc(book.id).delete()
		.then(() => {
			dispatch(deleteBook({ id: book.id, ...book }))
		}).catch(err => console.log(err))
}