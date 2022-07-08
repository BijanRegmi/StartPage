import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import rootReducer from "./rootReducer"
import searchReducer from "./searchReducer"

const store = configureStore({
	reducer: {
		root: rootReducer,
		search: searchReducer,
	},
	middleware: [thunk],
})

export default store
