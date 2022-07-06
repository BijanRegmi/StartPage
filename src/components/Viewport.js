import React, { useState } from "react"
import Card from "./Card"

const bookmarks = require("../../bookmarks.json").children[1].children

const Viewport = () => {
	const [hovered, setHovered] = useState(0)
	const [hoveredTitle, setHoveredTitle] = useState("...")

	const mouseEnterHandler = e => {
		e.preventDefault()
		console.log(e)
		setHovered(parseInt(e._targetInst?.key))
	}

	const setTitle = title => {
		setHoveredTitle(title)
	}

	return (
		<div className="viewport">
			<div className="tab_bar">
				<div
					className="folder"
					onMouseEnter={mouseEnterHandler}
					key={-1}
				>
					Search
				</div>

				{bookmarks.map(folder => {
					if (folder.type != "text/x-moz-place-container") return
					return (
						<div
							onMouseEnter={mouseEnterHandler}
							className="folder"
							key={folder.id}
						>
							{folder.title}
						</div>
					)
				})}
			</div>
			<div className="childrens">
				{hovered === -1
					? "LEL"
					: bookmarks
							.filter(item => item.id === hovered)[0]
							?.children?.map((child, index) => (
								<Card
									onHover={setTitle}
									item={child}
									key={child.id}
								/>
							))}
			</div>
			<div className="title">{hoveredTitle}</div>
		</div>
	)
}

export default Viewport
