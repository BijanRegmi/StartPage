import { config } from "../../config"
import { createRef } from "react"

import {
	CARD_ACTIVE,
	CARD_CLICK,
	CARD_DOWN,
	CARD_LEFT,
	CARD_RIGHT,
	CARD_UP,
	CHANGE_ENGINE,
	CHANGE_TAB,
	EMPTY_SUGGESTION,
	LOAD_SUGGESTION,
	SEARCH_QUERY,
	SEARCH_SUGGESTION,
	SET_SUGGESTION,
	SET_TITLE,
	SUGGESTION_DOWN,
	SUGGESTION_UP,
	TABS_DOWN,
	TABS_UP,
} from "./action_types"

const initalState = {
	config,

	insertRef: createRef(),
	tabsRef: createRef(),
	cardsRef: createRef(),
	searchRef: createRef(),
	cmdRef: createRef(),
	rootRef: createRef(),

	currentTabIdx: 0,
	activeCard: -1,
	title: "...",

	querySuggestions: [],
	activeEngine: "Google",
	activeSuggestion: -1,
}

export const visit = location => (window.location = location)

const rootReducer = (state = initalState, action) => {
	let temp
	switch (action.type) {
		case SET_TITLE:
			return { ...state, title: action.payload }

		// Tabs
		case CHANGE_TAB:
			return { ...state, currentTabIdx: action.payload }

		case TABS_DOWN:
			temp = (state.currentTabIdx + 1) % state.config.bookmarks.length
			return { ...state, currentTabIdx: temp == NaN ? 0 : temp }

		case TABS_UP:
			temp = (state.currentTabIdx - 1) % state.config.bookmarks.length
			if (temp < 0) temp += state.config.bookmarks.length
			return { ...state, currentTabIdx: temp == NaN ? 0 : temp }

		// Search
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

		case SUGGESTION_DOWN:
			temp = (state.activeSuggestion + 1) % state.querySuggestions.length
			return { ...state, activeSuggestion: temp == NaN ? -1 : temp }

		case SUGGESTION_UP:
			temp = (state.activeSuggestion - 1) % state.querySuggestions.length
			if (temp < -1) temp += state.querySuggestions.length + 1
			return { ...state, activeSuggestion: temp == NaN ? -1 : temp }

		case SEARCH_QUERY:
			visit(
				state.config.engines[state.activeEngine].result(
					state.insertRef.current.value
				)
			)
			return state

		case SEARCH_SUGGESTION:
			if (state.activeSuggestion != -1)
				visit(
					state.config.engines[state.activeEngine].result(
						state.querySuggestions[state.activeSuggestion]
					)
				)
			return state

		case CHANGE_ENGINE:
			return { ...state, activeEngine: action.payload }

		// Cards
		case CARD_ACTIVE:
			return { ...state, activeCard: action.payload }

		case CARD_CLICK:
			if (state.activeCard != -1) {
				visit(
					state.config.bookmarks[state.currentTabIdx].childrens[
						state.activeCard
					].uri
				)
			}
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
