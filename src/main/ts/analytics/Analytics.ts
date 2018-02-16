import {Notifier} from "signal-slot";
import {Event} from "./event/Event";
import {TrackingBeacon} from "./beacon/TrackingBeacon";

export class Analytics extends Notifier {
	private beacon: TrackingBeacon = new TrackingBeacon();

	public onDocumentReady(): void {
		this.notify(Event.onDocumentReady).now();
	}
}
