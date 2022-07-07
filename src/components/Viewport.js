import React, { useState, useContext, createContext } from "react"
import Card from "./Card"
import Search from "./Search"
import { configContext } from "../App"

const Viewport = () => {
	const { bookmarks } = useContext(configContext)

	const [hovered, setHovered] = useState(-1)
	const [hoveredTitle, setHoveredTitle] = useState("...")

	const mouseEnterHandler = e => setHovered(parseInt(e._targetInst?.key))
	const setTitle = title => setHoveredTitle(title)

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

			{hovered === -1 ? (
				<Search />
			) : (
				<>
					<div className="childrens">
						{bookmarks[hovered]?.childrens?.map((child, index) => (
							<Card onHover={setTitle} item={child} key={index} />
						))}
					</div>
					<div className="title">{hoveredTitle}</div>
				</>
			)}
		</div>
	)
}

export default Viewport
