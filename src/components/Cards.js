import React from "react"
import { useDispatch, useSelector } from "react-redux"
import "../Styles/Cards.css"

import {
	CARD_ACTIVE,
	CARD_CLICK,
	SET_TITLE,
} from "../StateManagement/action_types"
import { visit } from "../StateManagement/rootReducer"

const Cards = () => {
	const {
		activeCard,
		config: { bookmarks },
		currentTabIdx,
		cardsRef,
	} = useSelector(state => state.root)
	const dispatch = useDispatch()

	const hoverIn = e => {
		let idx = parseInt(e._targetInst.key)
		dispatch({
			type: SET_TITLE,
			payload: bookmarks[currentTabIdx].childrens[idx].title,
		})
		dispatch({ type: CARD_ACTIVE, payload: idx })
	}
	const hoverOut = e => {
		dispatch({ type: SET_TITLE, payload: "..." })
		dispatch({ type: CARD_ACTIVE, payload: -1 })
	}
	const click = e => dispatch({ type: CARD_CLICK })

	const clippingLen = 30

	return (
		<div className="item cards" ref={cardsRef} tabIndex="3">
			{bookmarks[currentTabIdx]?.childrens?.map((card, idx) => (
				<div
					key={idx}
					className={`card ${
						activeCard == idx ? "card--active" : ""
					}`}
					onMouseEnter={hoverIn}
					onMouseLeave={hoverOut}
					onClick={click}
				>
					{card.title.length > clippingLen
						? card.title.substring(0, clippingLen - 3) + "..."
						: card.title}
					<div className="card-key">{card.key}</div>
				</div>
			))}
		</div>
	)
}

export default Cards
