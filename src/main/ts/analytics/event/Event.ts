import {Signal} from "signal-slot";
import {AgentConfig} from "../model/AgentConfig";

export namespace Event {
	export const onDocumentReady: Signal<object> = new Signal();
	export const onAgentConfigLoaded: Signal<AgentConfig[]> = new Signal();
	export const onConcurrencyBeaconRequested: Signal<object> = new Signal();
}
