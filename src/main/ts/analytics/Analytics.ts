import {Notifier} from "signal-slot";
import {Event} from "./event/Event";
import {Registrar} from "./registrar/Registrar";
import {CBSiBeacon} from "./agent/CBSiBeacon";
import {Comscore} from "./agent/Comscore";
import {AgentConfig} from "./model/AgentConfig";

export class Analytics extends Notifier {
	private registrar: Registrar = new Registrar();

	constructor() {
		super();
		this.when(Event.onAgentConfigLoaded).start();
	}

	public onDocumentReady(): void {
		this.notify(Event.onDocumentReady).queue();
	}

	public onAgentConfigLoaded(agentConfig: AgentConfig[]): void {
		for (let config of agentConfig) {
			switch (config.name) {
				case CBSiBeacon.NAME:
					this.registrar.registerCBSiBeacon(config);
					break;

				case Comscore.NAME:
					this.registrar.registerComscore(config);
					break;
			}
		}

		this.notify(Event.onAgentConfigLoaded).with(agentConfig).now();
	}

	public onConcurrencyBeaconRequested(params: object): void {
		this.notify(Event.onConcurrencyBeaconRequested).with(params).queue();
	}

}
