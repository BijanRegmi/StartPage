import { Provider } from "react-redux"
import store from "./StateManagement/store"

import Cards from "./components/Cards"
import Search from "./components/Search"
import Tabs from "./components/Tabs"
import Time from "./components/Time"

export default () => (
	<Provider store={store}>
		<Time />
		<Tabs />
		<div className="item weather">Weather</div>
		<Cards />
		<Search />
		<div className="item cmd">CMD</div>
	</Provider>
)
