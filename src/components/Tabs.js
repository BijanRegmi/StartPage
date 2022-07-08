import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CHANGE_TAB } from "../StateManagement/action_types"
import "../Styles/Tabs.css"

const Tabs = () => {
	const {
		config: { bookmarks },
		currentTabIdx,
	} = useSelector(state => state.root)
	const dispatch = useDispatch()

	const [hoveredTab, setHoveredTab] = useState(-1)
	const mouseEnter = e => setHoveredTab(parseInt(e._targetInst.key))
	const mouseLeave = e => setHoveredTab(-1)
	const setTab = t => dispatch({ type: CHANGE_TAB, payload: t })

	return (
		<div className="item tabs">
			{bookmarks.map((bookmark, idx) => {
				let name = `folder `
				idx == hoveredTab ? (name += "folder--hover ") : ""
				idx == currentTabIdx ? (name += "folder--active") : ""

				return (
					<div
						key={bookmark.id}
						className={name}
						onMouseEnter={mouseEnter}
						onMouseLeave={mouseLeave}
						onClick={() => setTab(idx)}
					>
						{bookmark.title[0].toUpperCase()}
						<span className="tooltip">{bookmark.title}</span>
					</div>
				)
			})}
		</div>
	)
}

export default Tabs
