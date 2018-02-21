import {Mux} from "../agent/Mux";
import * as mux from "mux-embed";

export class MuxBuilder {
	private mux_embed: any = require("mux-embed");
	private selectorId: string | undefined;
	private videoData: mux.metadata | undefined;
	private isDebug: boolean = false;
	private hasMonitor: boolean = false;

	public withSelectorId(id: string): MuxBuilder {
		this.selectorId = id;
		return this;
	}

	public setData(data: mux.metadata): MuxBuilder {
		this.videoData = data;
		return this;
	}

	public debugOn(): MuxBuilder {
		this.isDebug = true;
		return this;
	}

	public build(): MuxBuilder {
		if (!this.hasMonitor) {
			this.mux_embed.monitor(this.selectorId, {
				"debug": this.isDebug,
				"data": this.videoData
			});

			this.hasMonitor = true;
		}

		return this;
	}

	public destroy(): void {}

	public emitVideoChange(): MuxBuilder {
		this.mux_embed.emit(this.selectorId, Mux.VIDEO_CHANGE, this.videoData);
		return this;
	}
}
/*
https://docs.mux.com/video-element/changing-the-video
// Example of changing the source of a video element
// Should happen before emitting the videochange event
var myVideo = document.querySelector('#myVideo');
myVideo.src = 'nextVideo.mp4';

if (typeof mux !== 'undefined') {
  mux.emit('#myVideo', 'videochange', {
    video_id: 'abc345',
    video_title: 'My Other Great Video',
    video_series: 'Weekly Great Videos',
    ...
  });
}
*/
