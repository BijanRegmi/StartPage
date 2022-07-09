import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Cards from "./components/Cards"
import Cmd from "./components/Cmd"
import Search from "./components/Search"
import Tabs from "./components/Tabs"
import Time from "./components/Time"
import {
	CARD_DOWN,
	CARD_LEFT,
	CARD_RIGHT,
	CARD_UP,
	CHANGE_ENGINE,
	CHANGE_TAB,
	SEARCH_QUERY,
	SEARCH_SUGGESTION,
	SUGGESTION_DOWN,
	SUGGESTION_UP,
	TABS_DOWN,
	TABS_UP,
} from "./StateManagement/action_types"

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
			for (const engine in state.config.engines)
				if (state.config.engines[engine].key == key)
					return dispatch({ type: CHANGE_ENGINE, payload: engine })
		} else if (activeElement == state.tabsRef.current) {
			switch (key) {
				case "j":
					return dispatch({ type: TABS_DOWN })
				case "k":
					return dispatch({ type: TABS_UP })
			}
			for (const tab of state.config.bookmarks)
				if (tab.key === key)
					return dispatch({ type: CHANGE_TAB, payload: tab.id })
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
			}
		} else if (activeElement == state.cmdRef.current) {
		}
	}

	useEffect(() => {
		state.rootRef.current.focus()
	}, [])

	return (
		<div
			className="startpage"
			tabIndex={0}
			onKeyDown={handleKeyEvents}
			ref={state.rootRef}
		>
			<Time />
			<Tabs />
			<div className="item weather" tabIndex="2">
				Weather
			</div>
			<Cards />
			<Search />
			<Cmd />
		</div>
	)
}
