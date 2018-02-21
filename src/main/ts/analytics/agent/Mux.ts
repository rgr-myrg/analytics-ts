import {MuxBuilder} from "../builder/MuxBuilder";
import * as mux_embed from "mux-embed";

export class Mux {
	public static NAME: string = "Mux";
	public static VIDEO_CHANGE: string = "videochange";

	private builder: MuxBuilder = new MuxBuilder();
	private selectorId: string = "";
	private hasPlayStart: boolean = false;

	private onPlayerLoaded(id: string): void {
		console.log("[MuxSubscriber] id: ", id);
		this.selectorId = id;
	}

	private onVideoData(data: mux_embed.metadata): void {
		console.log("[MuxSubscriber] data: ", data);

		this.builder
			.withSelectorId(this.selectorId)
			.setData(data)
			.debugOn()
			.build();
	}

	private onPlayStart(data: mux_embed.metadata): void {
		if (this.hasPlayStart) {
			this.builder
				.setData(data)
				.emitVideoChange();
		}

		this.hasPlayStart = true;
	}
}
