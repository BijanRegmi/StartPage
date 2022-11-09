import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RESET, SET_THEME } from "../StateManagement/action_types"
import { visit } from "../StateManagement/rootReducer"
import "../Styles/Cmd.css"

const Cmd = () => {
	const [cmd, setCmd] = useState("")
	const {
		cmdRef,
		config: { links },
	} = useSelector(state => state.root)
	const dispatch = useDispatch()

	const changeCmd = e => setCmd(e.target.value)
	const cmdParser = e => {
		e.preventDefault()

		// remove the leading :
		let c = cmd.replace(/^:/, "")

		setCmd("")

		let args = c.split(" ")
		switch (args[0]) {
			case "rs":
				return dispatch({ type: RESET })
			case "theme":
				return dispatch({ type: SET_THEME, payload: args[1] })
			default:
				break
		}
		if (c in links) visit(links[c])

		// Visit the localhost port address
		const portNum = args[0].match(/^\d+/g)[0]
		const endpoint = args[0].replace(/^\d+/g, "")
		const url = `http://localhost:${portNum}${endpoint}`
		visit(url)
	}

	return (
		<form onSubmit={cmdParser} className="item cmd">
			<label htmlFor="stdin" className="prompt">
				immo
			</label>
			<input
				autoComplete="off"
				ref={cmdRef}
				type="text"
				id="stdin"
				value={cmd}
				onChange={changeCmd}
			/>
		</form>
	)
}

export default Cmd
