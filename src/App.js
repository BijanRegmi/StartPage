import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { engines } from "./engines"
import Cards from "./components/Cards"
import Cmd from "./components/Cmd"
import Search from "./components/Search"
import Tabs from "./components/Tabs"
import Time from "./components/Time"
import "./Styles/themes.css"
import {
	CARD_CLICK,
	CARD_DOWN,
	CARD_LEFT,
	CARD_RIGHT,
	CARD_SHORTCUT,
	CARD_UP,
	CHANGE_ENGINE,
	CHANGE_TAB,
	LOAD_BOOKMARKS,
	LOAD_LINKS,
	SEARCH_QUERY,
	SEARCH_SUGGESTION,
	SET_THEME,
	SUGGESTION_DOWN,
	SUGGESTION_UP,
	TABS_DOWN,
	TABS_UP,
} from "./StateManagement/action_types"
import Weather from "./components/Weather"

export default () => {
	const state = useSelector(state => state.root)
	const dispatch = useDispatch()

	const handleKeyEvents = e => {
		const { altKey, ctrlKey, key, keyCode, shiftKey } = e

		const activeElement = document.activeElement

		if (activeElement == state.insertRef.current) {
			switch (key) {
				case "Escape":
					return state.searchRef.current.focus()
				case "Enter":
					if (shiftKey) return dispatch({ type: SEARCH_SUGGESTION })
					else return dispatch({ type: SEARCH_QUERY })
				default:
					return
			}
		}

		if (key === "Escape") state.rootRef.current.focus()

		// Root Window
		if (activeElement == state.rootRef.current) {
			switch (key) {
				case "s":
					return state.searchRef.current.focus()
				case "i":
					e.preventDefault()
					return state.insertRef.current.focus()
				case "t":
					return state.tabsRef.current.focus()
				case "c":
					return state.cardsRef.current.focus()
				case ":":
					return state.cmdRef.current.focus()
				default:
					return
			}
		} else if (activeElement == state.searchRef.current) {
			// SEARCH WIDGET
			switch (key) {
				case "Escape":
					return state.rootRef.current.focus()
				case "i":
					e.preventDefault()
					return state.insertRef.current.focus()
				case "j":
					return dispatch({ type: SUGGESTION_DOWN })
				case "k":
					return dispatch({ type: SUGGESTION_UP })
				case "l":
					return dispatch({ type: SEARCH_SUGGESTION })
				default:
					break
			}

			// SEARCH ENGINES SHORTCUT KEY
			for (const engine in engines)
				if (engines[engine].key == key)
					return dispatch({ type: CHANGE_ENGINE, payload: engine })
		} else if (activeElement == state.tabsRef.current) {
			// TABS WIDGET
			switch (key) {
				case "j":
					return dispatch({ type: TABS_DOWN })
				case "k":
					return dispatch({ type: TABS_UP })
				case "Enter":
				case "c":
					return state.cardsRef.current.focus()
			}

			// TABS SHORTCUT KEY
			for (const tab of state.bookmarks)
				if (tab.key === key) {
					state.cardsRef.current.focus()
					return dispatch({ type: CHANGE_TAB, payload: tab.id })
				}
		} else if (activeElement == state.cardsRef.current) {
			switch (key) {
				case "j":
					return dispatch({ type: CARD_DOWN })
				case "k":
					return dispatch({ type: CARD_UP })
				case "l":
					return dispatch({ type: CARD_RIGHT })
				case "h":
					return dispatch({ type: CARD_LEFT })
				case "Enter":
					return dispatch({ type: CARD_CLICK })
				default:
					return dispatch({ type: CARD_SHORTCUT, payload: key })
			}
		} else if (activeElement == state.cmdRef.current) {
		}
	}

	useEffect(() => {
		state.rootRef.current.focus()

		let theme = localStorage.getItem("theme")
		if (theme) dispatch({ type: SET_THEME, payload: theme })

		dispatch({ type: LOAD_LINKS })
		dispatch({ type: LOAD_BOOKMARKS })
	}, [])

	return (
		<div
			className={`startpage ${state.theme}`}
			tabIndex={0}
			onKeyDown={handleKeyEvents}
			ref={state.rootRef}
		>
			<Time />
			<Tabs />
			<Weather />
			<Cards />
			<Search />
			<Cmd />
		</div>
	)
}
