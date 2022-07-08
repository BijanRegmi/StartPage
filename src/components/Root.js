import React from "react"
import Search from "./Search"
import Time from "./Time"

const Root = () => {
	return (
		<div className="root">
			{/* Time */}
			<Time />
			{/* Tabs */}
			<div className="item tabs">Tabs</div>
			{/* Weather */}
			<div className="item weather">Weather</div>
			{/* Childrens */}
			<div className="item childrens">Childrens</div>
			{/* Search */}
			<Search />
			{/* <div className="item search">Search</div> */}
			{/* CommandLine */}
			<div className="item cmd">CMD</div>
		</div>
	)
}

export default Root
