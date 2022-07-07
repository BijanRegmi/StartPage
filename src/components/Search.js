import React, { useState, useEffect, useRef, useContext } from "react"
import { configContext } from "../App"

const Search = () => {
	const { engines } = useContext(configContext)

	const [queryString, setQueryString] = useState("")
	const [querySuggestions, setQuerySuggestions] = useState([])
	const [queryEngine, setQueryEngine] = useState("Google")
	const [engineListVisible, setEngineListVisible] = useState(false)
	const [activeSuggestion, setActiveSuggestion] = useState(-1)
	const [insertMode, setInsertMode] = useState(true)

	const input = useRef()
	const search = useRef()

	const suggestionMouseEnter = e => setActiveSuggestion(e._targetInst.key)
	const suggestionMouseLeave = e => setActiveSuggestion(-1)
	const showEngines = e => setEngineListVisible(true)
	const hideEngines = e => setEngineListVisible(false)
	const changeEngine = engine => setQueryEngine(engine)
	const changeQuery = e => setQueryString(e.target.value)
	const visit = _ => (window.location = engines[queryEngine].result(_))

	const toggleVim = () => {
		if (document.activeElement == input.current) {
			search.current.focus()
			setInsertMode(false)
		} else {
			input.current.focus()
			setInsertMode(true)
		}
	}

	const handleKeyDown = e => {
		const key = e.key
		console.log(key)

		if (key === "Escape") toggleVim()

		let temp
		if (!insertMode) {
			switch (key) {
				case "Enter":
				case "l":
					if (activeSuggestion == -1) {
						if (e.shiftKey) visit(querySuggestions[0])
						else visit(queryString)
					} else visit(querySuggestions[activeSuggestion])
					return
				case "j":
					temp = (activeSuggestion + 1) % querySuggestions.length
					setActiveSuggestion(temp == NaN ? -1 : temp)
					return
				case "k":
					temp = (activeSuggestion - 1) % querySuggestions.length
					if (temp < -1) temp += querySuggestions.length + 1
					setActiveSuggestion(temp == NaN ? -1 : temp)
					return
				case "1":
				case "2":
				case "3":
				case "4":
				case "5":
				case "6":
				case "7":
				case "8":
				case "9":
					temp = parseInt(key) - 49
					if (temp < querySuggestions.length)
						visit(querySuggestions[temp])
					return
				default:
					break
			}

			for (const engine in engines) {
				if (engines[engine].key == key) {
					setQueryEngine(engine)
					return
				}
			}
		}
	}

	const fetchSuggestions = () => {
		if (queryString.length > 2)
			fetch(engines[queryEngine].url + queryString)
				.then(res => res.json())
				.then(res =>
					setQuerySuggestions(engines[queryEngine].parser(res))
				)
		else setQuerySuggestions([])
	}

	useEffect(() => {
		input.current.focus()
	}, [])

	useEffect(fetchSuggestions, [queryString, queryEngine])

	return (
		<div
			className="search"
			ref={search}
			onKeyDown={handleKeyDown}
			tabIndex={0}
		>
			<input
				type="text"
				className={`query-input ${
					querySuggestions.length ? "bottomActive" : ""
				}`}
				ref={input}
				onChange={changeQuery}
			/>

			<div
				className={`setEngine ${engineListVisible && "bottomActive"}`}
				onMouseEnter={showEngines}
				onMouseLeave={hideEngines}
			>
				<span>{queryEngine}</span>
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
