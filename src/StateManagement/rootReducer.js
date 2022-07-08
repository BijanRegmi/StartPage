import { config } from "../../config"
import { createRef } from "react"

import {
	CHANGE_TAB,
	EMPTY_SUGGESTION,
	LOAD_SUGGESTION,
	SET_SUGGESTION,
	SET_TITLE,
	TOGGLE_VIM,
	VIM_COMMAND,
} from "./action_types"

const initalState = {
	config,

	insertRef: createRef(),
	outerRef: createRef(),
	insertMode: true,

	currentTabIdx: 0,
	activeCard: -1,
	title: "...",

	querySuggestions: [],
	activeEngine: "Google",
	activeSuggestion: -1,
}

export const visit = location => (window.location = location)

const rootReducer = (state = initalState, action) => {
	switch (action.type) {
		// Global
		case TOGGLE_VIM:
			if (document.activeElement == state.insertRef.current) {
				state.outerRef.current.focus()
				return { ...state, insertMode: false }
			} else {
				state.insertRef.current.focus()
				return { ...state, insertMode: true }
			}

		case SET_TITLE:
			return { ...state, title: action.payload }

		case CHANGE_TAB:
			return { ...state, currentTabIdx: action.payload }

		// Search Page
		case EMPTY_SUGGESTION:
			return { ...state, querySuggestions: [] }

		case LOAD_SUGGESTION:
			return {
				...state,
				querySuggestions: state.config.engines[
					state.activeEngine
				].parser(action.payload),
			}

		case SET_SUGGESTION:
			return { ...state, activeSuggestion: action.payload }

		// Key controls
		case VIM_COMMAND:
			console.log("Inside vim_command", action.payload)
			return state

		default:
			return state
	}
}

export default rootReducer
