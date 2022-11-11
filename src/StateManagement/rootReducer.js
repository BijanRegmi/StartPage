import { createRef } from "react"
import { engines } from "../engines"

import {
	ADD_BOOKMARK,
	ADD_TAB,
	CARD_ACTIVE,
	CARD_CLICK,
	CARD_DOWN,
	CARD_LEFT,
	CARD_RIGHT,
	CARD_SHORTCUT,
	CARD_UP,
	CHANGE_ENGINE,
	CHANGE_TAB,
	EMPTY_SUGGESTION,
	LOAD_BOOKMARKS,
	LOAD_LINKS,
	LOAD_SUGGESTION,
	RESET,
	SAVE_BOOKMARKS,
	SAVE_LINKS,
	SEARCH_QUERY,
	SEARCH_SUGGESTION,
	SET_SUGGESTION,
	SET_THEME,
	SET_TITLE,
	SUGGESTION_DOWN,
	SUGGESTION_UP,
	TABS_DOWN,
	TABS_UP,
	TOGGLE_EDIT,
} from "./action_types"

const initialState = {
	editing: false,

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

	theme: "nord",
	links: {},
	bookmarks: [],
}

export const visit = location => (window.location = location)

const rootReducer = (state = initialState, action) => {
	let temp
	switch (action.type) {
		case SET_TITLE:
			return { ...state, title: action.payload }

		case SET_THEME:
			localStorage.setItem("theme", action.payload)
			return { ...state, theme: action.payload }

		// Tabs
		case CHANGE_TAB:
			return { ...state, currentTabIdx: action.payload }

		case TABS_DOWN:
			temp = (state.currentTabIdx + 1) % state.bookmarks.length
			return { ...state, currentTabIdx: temp == NaN ? 0 : temp }

		case TABS_UP:
			temp = (state.currentTabIdx - 1) % state.bookmarks.length
			if (temp < 0) temp += state.bookmarks.length
			return { ...state, currentTabIdx: temp == NaN ? 0 : temp }

		// Search
		case EMPTY_SUGGESTION:
			return { ...state, querySuggestions: [] }

		case LOAD_SUGGESTION:
			return {
				...state,
				querySuggestions: engines[state.activeEngine].parser(
					action.payload
				),
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
				engines[state.activeEngine].result(
					state.insertRef.current.value
				)
			)
			return state

		case SEARCH_SUGGESTION:
			if (state.activeSuggestion != -1)
				visit(
					engines[state.activeEngine].result(
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
					state.bookmarks[state.currentTabIdx].childrens[
						state.activeCard
					].uri
				)
			}
			return state

		case CARD_DOWN:
			if (state.activeCard == -1) temp = 0
			else {
				let len = state.bookmarks[state.currentTabIdx].childrens.length
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
				let len = state.bookmarks[state.currentTabIdx].childrens.length
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
				let len = state.bookmarks[state.currentTabIdx].childrens.length
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
				let len = state.bookmarks[state.currentTabIdx].childrens.length
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

		case CARD_SHORTCUT:
			temp = state.bookmarks[state.currentTabIdx].childrens
			for (const card of temp)
				if (card.key == action.payload) visit(card.uri)
			return state

		// CMD
		case RESET:
			return initialState

		// Config
		case LOAD_LINKS:
			let links = localStorage.getItem("links")
			if (links) return { ...state, links: JSON.parse(links) }
			else return state
		case LOAD_BOOKMARKS:
			let bookmarks = localStorage.getItem("bookmarks")
			if (bookmarks) return { ...state, bookmarks: JSON.parse(bookmarks) }
			else return state
		case SAVE_LINKS:
			localStorage.setItem("links", JSON.stringify(state.links))
			return state
		case SAVE_BOOKMARKS:
			localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks))
			return state

		// Editing
		case TOGGLE_EDIT:
			return { ...state, editing: !state.editing }
		case ADD_TAB:
			var { data, idx } = action.payload
			var newBookmarks = state.bookmarks
			if (idx != undefined)
				newBookmarks[idx] = {
					...data,
					childrens: newBookmarks[idx].childrens,
				}
			else newBookmarks.push({ ...data, childrens: [] })
			return { ...state, bookmarks: newBookmarks }
		case ADD_BOOKMARK:
			var { data, idx } = action.payload
			var newBookmarks = state.bookmarks
			if (idx != undefined)
				newBookmarks[state.currentTabIdx].childrens[idx] = data
			else newBookmarks[state.currentTabIdx].childrens.push(data)
			console.log({ old: state.bookmarks, new: newBookmarks })
			return { ...state, bookmarks: newBookmarks }
		default:
			return state
	}
}

export default rootReducer
