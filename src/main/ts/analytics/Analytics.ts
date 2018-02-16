import {Notifier} from "signal-slot";
import {Event} from "./event/Event";
import {TrackingBeacon} from "./beacon/TrackingBeacon";
import {AgentConfig} from "./model/AgentConfig";

export class Analytics extends Notifier {
	private trackingBeacon: TrackingBeacon | undefined;

	constructor() {
		super();
		this.when(Event.onAgentConfigLoaded).start();
	}

	public onDocumentReady(): void {
		this.notify(Event.onDocumentReady).queue();
	}

	public onAgentConfigLoaded(agentConfig: AgentConfig[]): void {
		for (let item of agentConfig) {
			if (item.name === TrackingBeacon.NAME) {
				this.trackingBeacon = new TrackingBeacon();
				continue;
			}
		}

		this.notify(Event.onAgentConfigLoaded).with(agentConfig).now();
	}

	public onConcurrencyBeaconRequested(params: object): void {
		this.notify(Event.onConcurrencyBeaconRequested).with(params).queue();
	}
}
