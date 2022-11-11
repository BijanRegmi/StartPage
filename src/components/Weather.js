import React, { useState } from "react"
import "../Styles/Weather.css"

const Modal = () => {
	return (
		<div className="modal">
			<div className="cross">X</div>
			<div className="editor">
				<input type="text">

				</input>
			</div>
		</div>
	)
}

const Weather = () => {
	const [show, setShow] = useState(false)

	const click = e => {
		e.preventDefault()
		setShow(old => !old)
	}

	return (
		<div className="item weather">
			<button onClick={click}>Click Me</button>
			{show && <Modal />}
		</div>
	)
}

export default Weather
