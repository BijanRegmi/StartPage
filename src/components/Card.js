import React from "react"

const Card = ({ item, onHover }) => {
	const clickHandler = e => {
		location.href = item.uri
	}

	const clippingLen = 30

	return (
		<div
			className="card"
			onMouseEnter={() => onHover(item.title)}
			onMouseLeave={() => onHover("...")}
			onClick={clickHandler}
		>
			{item.title.length > clippingLen
				? item.title.substring(0, clippingLen - 3) + "..."
				: item.title}
		</div>
	)
}

export default Card
