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
									setAdding({ bookmark, idx })
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
				)
			})}
			{editing ? (
				<div
					className="folder"
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
					<span className="tooltip">Add new tab</span>
				</div>
			) : null}
			{adding ? (
				<Modal
					inputs={[
						{
							name: "title",
							type: "text",
							label: "Title",
							placeholder: "Folder name",
							defaultValue: adding?.bookmark?.title,
						},
						{
							name: "key",
							type: "text",
							label: "Shortcut",
							placeholder: "Single character key",
							defaultValue: adding?.bookmark?.key,
						},
					]}
					onDiscard={e => {
						e.preventDefault()
						setAdding(false)
					}}
					onSave={data => {
						dispatch({
							type: ADD_TAB,
							payload: { data, idx: adding?.idx },
						})
						setAdding(false)
					}}
				/>
			) : null}
		</div>
	)
}

export default Tabs
