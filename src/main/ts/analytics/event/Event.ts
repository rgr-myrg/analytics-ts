import {Signal} from "signal-slot";

export namespace Event {
	export const onDocumentReady: Signal<object> = new Signal();
	export const onConcurrencyBeaconRequested: Signal<object> = new Signal();
}
