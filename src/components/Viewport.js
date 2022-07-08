import React from "react"
import { useDispatch, useSelector } from "react-redux"

import Card from "./Card"
import Search from "./Search"

import {
	CHANGE_TAB,
	TOGGLE_VIM,
	VIM_COMMAND,
} from "../StateManagement/action_types"

const Viewport = () => {
	// StateManagement
	const dispatch = useDispatch()
	const {
		config: { bookmarks },
		insertRef,
		outerRef,
		currentTabIdx,
		title,
		insertMode,
	} = useSelector(state => state.root)

	// Helper Functions
	const mouseEnterHandler = e =>
		dispatch({ type: CHANGE_TAB, payload: parseInt(e._targetInst?.key) })
	const handleKeyDown = e => {
		const { key, altKey, ctrlKey, shiftKey } = e
		if (key === "Escape") dispatch({ type: TOGGLE_VIM })
		else if (!insertMode)
			dispatch({
				type: VIM_COMMAND,
				payload: { key, altKey, ctrlKey, shiftKey },
			})
	}

	return (
		<div className="viewport" ref={outerRef} onKeyDown={handleKeyDown}>
			<div className="tab_bar">
				<div
					className="folder"
					onMouseEnter={mouseEnterHandler}
					key={-1}
				>
					Search
				</div>

				{bookmarks.map((folder, idx) => {
					return (
						<div
							onMouseEnter={mouseEnterHandler}
							className="folder"
							key={idx}
						>
							{folder.title}
						</div>
					)
				})}
			</div>

			{currentTabIdx === -1 ? (
				<Search insertRef={insertRef} />
			) : (
				<div className="childrens">
					{bookmarks[currentTabIdx]?.childrens?.map(
						(child, index) => (
							<Card item={child} key={index} />
						)
					)}
				</div>
			)}
			<div className="title">{title}</div>
		</div>
	)
}

export default Viewport
