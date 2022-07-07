import react, { createContext } from "react"
import { config } from "../config"
import Viewport from "./components/Viewport"

export const configContext = createContext()

export default () => (
	<configContext.Provider value={config}>
		<Viewport />
	</configContext.Provider>
)
