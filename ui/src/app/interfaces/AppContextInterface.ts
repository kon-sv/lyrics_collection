import AppState from "@/objects/AppState"
import { Dispatch, SetStateAction } from "react"

export default interface IAppContext {
	appState?: AppState
	appReady?: boolean
	setAppReady?: Dispatch<SetStateAction<boolean>>
}
