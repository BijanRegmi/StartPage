import ReactDOM from "react-dom/client"
import App from "./App"
import "./Styles/app.css"
import { Provider } from "react-redux"
import store from "./StateManagement/store"

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<App />
	</Provider>
)
