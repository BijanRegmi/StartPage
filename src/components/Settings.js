import React from "react"
import { useDispatch } from "react-redux"
import { SAVE_BOOKMARKS, TOGGLE_EDIT } from "../StateManagement/action_types"
import "../Styles/Settings.css"

const Settings = () => {
	const dispatch = useDispatch()

	const edit = e => {
		e.preventDefault()
		dispatch({ type: TOGGLE_EDIT })
	}

	const sync = e => {
		e.preventDefault()
		dispatch({ type: SAVE_BOOKMARKS })
	}

	return (
		<div className="item settings">
			<button onClick={edit}>Edit</button>
			<button onClick={sync}>Sync</button>
		</div>
	)
}

export default Settings
