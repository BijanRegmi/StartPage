import { config } from "../../config"

const initalState = {
	queryString: "",
	querySuggestions: [],
	queryEngine: "Google",
	engineListVisible: false,
	activeSuggestion: -1,
	insertMode: true,
}

const searchReducer = (state = initalState, action) => {
	switch (action.types) {
		default:
			return state
			break
	}
}

export default searchReducer
