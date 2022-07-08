import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
	EMPTY_SUGGESTION,
	LOAD_SUGGESTION,
	SET_SUGGESTION,
	SET_TITLE,
} from "../StateManagement/action_types"

const Search = ({ insertRef }) => {
	// State Management
	const dispatch = useDispatch()
	const {
		querySuggestions,
		activeEngine,
		activeSuggestion,
		config: { engines },
	} = useSelector(state => state.root)
	const [queryString, setQueryString] = useState("")
	const [engineListVisible, setEngineListVisible] = useState(false)

	// Helper Functionss
	const showEngines = () => setEngineListVisible(true)
	const hideEngines = () => setEngineListVisible(false)
	const changeQuery = e => setQueryString(e.target.value)
	const suggestionMouseEnter = e =>
		dispatch({ type: SET_SUGGESTION, payload: e._targetInst.key })
	const suggestionMouseLeave = e =>
		dispatch({ type: SET_SUGGESTION, payload: -1 })
	const fetchSuggestions = () => {
		if (queryString.length > 2)
			fetch(engines[activeEngine].url + queryString)
				.then(res => res.json())
				.then(res => dispatch({ type: LOAD_SUGGESTION, payload: res }))
		else dispatch({ type: EMPTY_SUGGESTION })
	}

	// Use Effects
	useEffect(() => {
		insertRef.current.focus()
		dispatch({ type: SET_TITLE, payload: "Search" })
	}, [])
	useEffect(fetchSuggestions, [queryString, activeEngine])

	return (
		<div className="search">
			<input
				type="text"
				className={`query-input ${
					querySuggestions.length ? "bottomActive" : ""
				}`}
				ref={insertRef}
				onChange={changeQuery}
			/>

			<div
				className={`setEngine ${
					engineListVisible ? "bottomActive" : ""
				}`}
				onMouseEnter={showEngines}
				onMouseLeave={hideEngines}
			>
				{activeEngine}
			</div>

			{querySuggestions.length ? (
				<div className="query-suggestions">
					{querySuggestions.map((suggestion, idx) => (
						<div
							key={idx}
							onClick={() => visit(suggestion)}
							onMouseEnter={suggestionMouseEnter}
							onMouseLeave={suggestionMouseLeave}
							className={`suggestion ${
								activeSuggestion == idx
									? "suggestion--highlighted"
									: ""
							}`}
						>
							{suggestion}
						</div>
					))}
				</div>
			) : (
				""
			)}

			{engineListVisible ? (
				<div
					className="engines"
					onMouseEnter={showEngines}
					onMouseLeave={hideEngines}
				>
					{Object.keys(engines).map((engine, idx) => (
						<div
							key={idx}
							className="engine"
							onClick={() => changeEngine(engine)}
						>
							{engine}
						</div>
					))}
				</div>
			) : (
				""
			)}
		</div>
	)
}

export default Search
