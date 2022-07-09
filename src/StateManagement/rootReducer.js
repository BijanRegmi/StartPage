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

		case CARD_DOWN:
			if (state.activeCard == -1) temp = 0
			else {
				let len =
					state.config.bookmarks[state.currentTabIdx].childrens.length
				let full_row = Math.floor(len / 4)
				let last_col = len % 4
				let cur_i = state.activeCard
				let cur_r = Math.floor(cur_i / 4)
				let cur_c = cur_i % 4
				console.log({ len, full_row, last_col, cur_i, cur_r, cur_c })
				cur_r += 1
				if (cur_r > (cur_c + 1 <= last_col ? full_row : full_row - 1))
					cur_r = 0
				temp = cur_r * 4 + cur_c
			}
			return { ...state, activeCard: temp == NaN ? -1 : temp }

		case CARD_UP:
			if (state.activeCard == -1) temp = 0
			else {
				let len =
					state.config.bookmarks[state.currentTabIdx].childrens.length
				let full_row = Math.floor(len / 4)
				let last_col = len % 4
				let cur_i = state.activeCard
				let cur_r = Math.floor(cur_i / 4)
				let cur_c = cur_i % 4
				cur_r -= 1
				if (cur_r < 0)
					cur_r += cur_c + 1 <= last_col ? full_row + 1 : full_row
				temp = cur_r * 4 + cur_c
			}
			return { ...state, activeCard: temp == NaN ? -1 : temp }
		case CARD_LEFT:
			if (state.activeCard == -1) temp = 0
			else {
				let len =
					state.config.bookmarks[state.currentTabIdx].childrens.length
				let full_row = Math.floor(len / 4)
				let last_col = len % 4
				let cur_i = state.activeCard
				let cur_r = Math.floor(cur_i / 4)
				let cur_c = cur_i % 4
				cur_c -= 1
				if (cur_c < 0) cur_c += cur_r < full_row ? 4 : last_col
				temp = cur_r * 4 + cur_c
			}
			return { ...state, activeCard: temp == NaN ? -1 : temp }
		case CARD_RIGHT:
			if (state.activeCard == -1) temp = 0
			else {
				let len =
					state.config.bookmarks[state.currentTabIdx].childrens.length
				let full_row = Math.floor(len / 4)
				let last_col = len % 4
				let cur_i = state.activeCard
				let cur_r = Math.floor(cur_i / 4)
				let cur_c = cur_i % 4
				console.log({ len, full_row, last_col, cur_i, cur_r, cur_c })
				cur_c += 1
				if (cur_c >= (cur_r + 1 <= full_row ? 4 : last_col)) cur_c = 0
				temp = cur_r * 4 + cur_c
			}
			return { ...state, activeCard: temp == NaN ? -1 : temp }
		default:
			return state
	}
}

export default rootReducer
