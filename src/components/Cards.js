import React from "react"
import { useDispatch, useSelector } from "react-redux"
import "../Styles/Cards.css"

import { SET_TITLE } from "../StateManagement/action_types"
import { visit } from "../StateManagement/rootReducer"

const Cards = () => {
	const {
		config: { bookmarks },
		currentTabIdx,
	} = useSelector(state => state.root)
	const dispatch = useDispatch()

	const hoverHandler = e => {
		let key = parseInt(e._targetInst.key)
		dispatch({
			type: SET_TITLE,
			payload: bookmarks[currentTabIdx].childrens[key].title,
		})
	}
	const clearTitle = () => dispatch({ type: SET_TITLE, payload: "" })

	const clippingLen = 30

	return (
		<div className="item cards">
			{bookmarks[currentTabIdx]?.childrens?.map((card, idx) => (
				<div
					key={idx}
					className="card"
					onMouseEnter={hoverHandler}
					onMouseLeave={clearTitle}
					onClick={() => visit(card.uri)}
				>
					{card.title.length > clippingLen
						? card.title.substring(0, clippingLen - 3) + "..."
						: card.title}
				</div>
			))}
		</div>
	)
}

export default Cards
