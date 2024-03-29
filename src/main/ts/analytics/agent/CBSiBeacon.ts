import {Event} from "../event/Event";

export class CBSiBeacon {
	public static NAME: string = "CBSiBeacon";

	private beaconDivId: string = new Date().getTime().toLocaleString();
	private isDevMode: boolean = false;
	private queryString: string | undefined;

	constructor() {
		Event.onDocumentReady
			.do(this.onDocumentReady).once().context(this).bind();
	}

	public onDocumentReady(): void {
		this.createDivContainer();
	}

	public createDivContainer(): void {
		let div = document.createElement("div");
		div.id = this.beaconDivId;
		document.getElementsByTagName("head")[0].appendChild(div);
	}

	public devMode(mode: boolean): CBSiBeacon {
		this.isDevMode = mode;
		return this;
	}

	public queryParams(params: any): CBSiBeacon {
		let qs: Array<string> = new Array();
		for (let i in params) {
			if (params.hasOwnProperty(i)) {
				qs.push(i + "=" + params[i]);
			}
		}

		this.queryString = qs.join("&");

		return this;
	}
}
