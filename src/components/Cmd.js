import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RESET } from "../StateManagement/action_types"
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
		let c = cmd.replace(/^:/, "")
		setCmd("")
		switch (c) {
			case "rs":
				return dispatch({ type: RESET })
			default:
				break
		}
		if (c in links) visit(links[c])
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
