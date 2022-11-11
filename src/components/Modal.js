import "../Styles/Modal.css"

const Modal = ({ inputs, onSave, onDiscard }) => {
	const save = e => {
		e.preventDefault()
		const data = inputs.reduce((accum, value, idx) => {
			return { ...accum, [value.name]: e.target[idx].value }
		}, {})
		onSave(data)
	}

	return (
		<div className="modal-wrapper">
			<div className="modal-outer" onClick={onDiscard} />
			<form className="modal-form" onSubmit={save}>
				{inputs.map(input => (
					<div className="input-group">
						<label htmlFor={input.name}>{input.label}</label>
						<input
							name={input.name}
							type={input.type}
							defaultValue={input.defaultValue}
							placeholder={input.placeholder}
						/>
					</div>
				))}
				<div className="actions">
					<button type="submit" className="action-save">
						Save
					</button>
					<button className="action-discard" onClick={onDiscard}>
						Discard
					</button>
				</div>
			</form>
		</div>
	)
}

export default Modal
