import { Provider } from "react-redux"
import Viewport from "./components/Viewport"
import store from "./StateManagement/store"

export default () => (
	<Provider store={store}>
		<Viewport />
	</Provider>
)
