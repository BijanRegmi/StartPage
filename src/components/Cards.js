import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "../Styles/Cards.css"

import {
	CARD_ACTIVE,
	CARD_CLICK,
	SET_TITLE,
} from "../StateManagement/action_types"

import Modal from "./Modal"
const clippingLen = 30

const Cards = () => {
	const [adding, setAdding] = useState(false)
	const { activeCard, bookmarks, currentTabIdx, cardsRef, editing } =
		useSelector(state => state.root)
	const dispatch = useDispatch()

	const hoverIn = e => {
		let idx = parseInt(e._targetInst.key)
		dispatch({
			type: SET_TITLE,
			payload: bookmarks[currentTabIdx].childrens[idx].title,
		})
		dispatch({ type: CARD_ACTIVE, payload: idx })
	}

	const hoverOut = () => {
		dispatch({ type: SET_TITLE, payload: "..." })
		dispatch({ type: CARD_ACTIVE, payload: -1 })
	}

	const click = () => dispatch({ type: CARD_CLICK })

	return (
		<div className="item cards" ref={cardsRef} tabIndex="3">
			{bookmarks[currentTabIdx]?.childrens?.map((card, idx) => (
				<div
					key={idx}
					className={`card ${activeCard == idx ? "card--active" : ""
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
			{editing && bookmarks[currentTabIdx] ? (
				<div
					className="card"
					onClick={() => {
						setAdding(old => !old)
					}}
				>
					+
				</div>
			) : null}
			{adding ? (
				<Modal
					inputs={[
						{
							name: "title",
							type: "text",
							label: "Title",
							placeholder: "Title",
						},
						{
							name: "uri",
							type: "text",
							label: "URL",
							placeholder: "Site url",
						},
						{
							name: "key",
							type: "text",
							label: "Key",
							placeholder: "Single character key",
						},
					]}
					onDiscard={e => {
						e.preventDefault()
						setAdding(false)
					}}
					onSave={data => {
						console.log(data)
						setAdding(false)
					}}
				/>
			) : null}
		</div>
	)
}

export default Cards
