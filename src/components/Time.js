import React, { useEffect, useState } from "react"
import "../Styles/Time.css"

const Time = () => {
	const [currDate, setDate] = useState(new Date())

	useEffect(() => {
		setInterval(() => setDate(new Date()), 1000)
	}, [])

	return (
		<div className="item time" tabIndex='0'>
			<p>
				{currDate.toLocaleString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				})}
			</p>
		</div>
	)
}

export default Time
