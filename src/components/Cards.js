import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import "../Styles/Cards.css"

import {
	ADD_BOOKMARK,
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
					{editing && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="edit-pen"
							onClick={e => {
								e.preventDefault()
								e.stopPropagation()
								setAdding({ card, idx })
							}}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
							/>
						</svg>
					)}
				</div>
			))}
			{editing && bookmarks[currentTabIdx] ? (
				<div
					className="card"
					onClick={() => {
						setAdding(true)
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="add-btn"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
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
							defaultValue: adding?.card?.title,
						},
						{
							name: "uri",
							type: "text",
							label: "URL",
							placeholder: "Site url",
							defaultValue: adding?.card?.uri,
						},
						{
							name: "key",
							type: "text",
							label: "Key",
							placeholder: "Single character key",
							defaultValue: adding?.card?.key,
						},
					]}
					onDiscard={e => {
						e.preventDefault()
						setAdding(false)
					}}
					onSave={data => {
						dispatch({
							type: ADD_BOOKMARK,
							payload: { data, idx: adding?.idx },
						})
						setAdding(false)
					}}
				/>
			) : null}
		</div>
	)
}

export default Cards
