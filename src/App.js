import Cards from "./components/Cards"
import Search from "./components/Search"
import Tabs from "./components/Tabs"
import Time from "./components/Time"

export default () => {
	return (
		<div className="startpage">
			<Time />
			<Tabs />
			<div className="item weather">Weather</div>
			<Cards />
			<Search />
			<div className="item cmd">CMD</div>
		</div>
	)
}
