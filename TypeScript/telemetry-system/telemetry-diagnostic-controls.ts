import TelemetryClient from './telemetry-client';

export default class TelemetryDiagnosticControls {
	private diagnosticChannelConnectionString: string;

	private telemetryClient: TelemetryClient;
	private diagnosticInfo: string;

	constructor(telemetryClient: TelemetryClient) {
		this.telemetryClient = telemetryClient;
		this.diagnosticChannelConnectionString = '*111#';
		this.diagnosticInfo = '';
	}

	public readDiagnosticInfo() {
		return this.diagnosticInfo;
	}

	public writeDiagnosticInfo(newValue: string) {
		this.diagnosticInfo = newValue;
	}


	public checkTransmission() {
		this.diagnosticInfo = '';

		this.connectTelemetryClient();

		this.telemetryClient.send(this.telemetryClient.diagnosticMessage());
		this.diagnosticInfo = this.telemetryClient.receive();
	}

	private connectTelemetryClient() {
		this.telemetryClient.disconnect();
		let retryLeft = 3;
		while (!this.telemetryClient.getOnlineStatus() && retryLeft > 0) {
			this.telemetryClient.connect(this.diagnosticChannelConnectionString);
			retryLeft -= 1;
		}
		if (!this.telemetryClient.getOnlineStatus()) {
			throw new Error('Unable to connect');
		}
	}
}
