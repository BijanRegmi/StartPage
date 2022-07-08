import { Provider } from "react-redux"
import Root from "./components/Root"
import Viewport from "./components/Viewport"
import store from "./StateManagement/store"

export default () => (
	<Provider store={store}>
		<Root />
	</Provider>
)
