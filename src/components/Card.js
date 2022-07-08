import React from "react"
import { useDispatch } from "react-redux"

import { SET_TITLE } from "../StateManagement/action_types"

const Card = ({ item }) => {
	// StateManagement
	const dispatch = useDispatch()

	// Helper Functions
	const clickHandler = () => (location.href = item.uri)
	const setTitle = () => dispatch({ type: SET_TITLE, payload: item.title })
	const clearTitle = () => dispatch({ type: SET_TITLE, payload: "..." })

	const clippingLen = 30

	return (
		<div
			className="card"
			onMouseEnter={setTitle}
			onMouseLeave={clearTitle}
			onClick={clickHandler}
		>
			{item.title.length > clippingLen
				? item.title.substring(0, clippingLen - 3) + "..."
				: item.title}
		</div>
	)
}

export default Card
