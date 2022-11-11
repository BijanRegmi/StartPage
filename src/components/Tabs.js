import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ADD_TAB, CHANGE_TAB } from "../StateManagement/action_types"
import "../Styles/Tabs.css"
import Modal from "./Modal"

const Tabs = () => {
	const { bookmarks, currentTabIdx, tabsRef, editing } = useSelector(
		state => state.root
	)
	const dispatch = useDispatch()

	const [hoveredTab, setHoveredTab] = useState(-1)
	const [adding, setAdding] = useState(false)
	const mouseEnter = e => setHoveredTab(parseInt(e._targetInst.key))
	const mouseLeave = e => setHoveredTab(-1)
	const setTab = t => dispatch({ type: CHANGE_TAB, payload: t })

	return (
		<div className="item tabs" ref={tabsRef} tabIndex="1">
			{bookmarks.map((bookmark, idx) => {
				let name = `folder `
				idx == hoveredTab ? (name += "folder--hover ") : ""
				idx == currentTabIdx ? (name += "folder--active") : ""

				return (
					<div
						key={idx}
						className={name}
						onMouseEnter={mouseEnter}
						onMouseLeave={mouseLeave}
						onClick={() => setTab(idx)}
					>
						{bookmark.key}
						<span className="tooltip">{bookmark.title}</span>
					</div>
				)
			})}
			{editing ? (
				<div
					className="folder"
					onClick={() => {
						setAdding(true)
					}}
				>
					+<span className="tooltip">Add new tab</span>
				</div>
			) : null}
			{editing && adding ? (
				<Modal
					inputs={[
						{
							name: "title",
							type: "text",
							label: "Title",
							placeholder: "Folder name",
						},
						{
							name: "key",
							type: "text",
							label: "Shortcut",
							placeholder: "Single character key",
						},
					]}
					onDiscard={e => {
						e.preventDefault()
						setAdding(false)
					}}
					onSave={data => {
						data.childrens = []
						dispatch({ type: ADD_TAB, payload: data })
						setAdding(false)
					}}
				/>
			) : null}
		</div>
	)
}

export default Tabs
