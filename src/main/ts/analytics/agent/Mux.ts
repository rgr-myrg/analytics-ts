import {MuxData} from "../model/MuxData";
import {MuxBuilder} from "../builder/MuxBuilder";

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

	private onVideoData(data: MuxData): void {
		console.log("[MuxSubscriber] data: ", data);

		this.builder
			.withSelectorId(this.selectorId)
			.setData(data)
			.debugOn()
			.build();
	}

	private onPlayStart(data: MuxData): void {
		if (this.hasPlayStart) {
			this.builder
				.setData(data)
				.emitVideoChange();
		}

		this.hasPlayStart = true;
	}
}
