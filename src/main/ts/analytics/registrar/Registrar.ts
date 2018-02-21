import {AgentConfig} from "../model/AgentConfig";
import {CBSiBeacon} from "../agent/CBSiBeacon";
import {Comscore} from "../agent/Comscore";
import {Mux} from "../agent/Mux";

export class Registrar {
	private cbsiBeacon: CBSiBeacon | undefined;

	public registerCBSiBeacon(config: AgentConfig): void {
		if (config.enabled && this.cbsiBeacon === undefined) {
			this.cbsiBeacon = new CBSiBeacon();
		}
	}

	public registerComscore(config: AgentConfig): void {}
	public registerNielsen(config: AgentConfig): void {}
	public registerAdobe(config: AgentConfig): void {}
	public registerMux(config: AgentConfig): void {}
}
