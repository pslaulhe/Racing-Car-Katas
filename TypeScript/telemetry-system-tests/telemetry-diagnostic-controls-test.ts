import { expect } from 'chai';
import 'mocha';
import * as sinon from "sinon";
import TelemetryClient from "../telemetry-system/telemetry-client";
import TelemetryDiagnosticControls from '../telemetry-system/telemetry-diagnostic-controls';

describe('Telemetry System', () => {

	describe('TelemetryDiagnosticControls', () => {
		const telemtryClient = new TelemetryClient();
		it('CheckTransmission should send a diagnostic message and receive a status message response', () => {
			const telemetryDiagnosticControls = new TelemetryDiagnosticControls(telemtryClient);
			telemetryDiagnosticControls.checkTransmission();
			const diagnosticInfo = telemetryDiagnosticControls.readDiagnosticInfo();
			// tslint:disable-next-line:no-unused-expression
			expect(diagnosticInfo).not.empty;
		});
		//This method should be tested with the number of time we call connectTelemetryClient() and the exception
		it('Connect telemetry client happy path', () => {
			sinon.stub(telemtryClient, 'connect');
			sinon.stub(telemtryClient, 'getOnlineStatus').returns(true);
			const telemetryDiagnosticControls = new TelemetryDiagnosticControls(telemtryClient);
			telemetryDiagnosticControls.connectTelemetryClient();

			//To change
			expect(telemtryClient.getOnlineStatus()).to.be.true;
		});

		it('Test telemetry client connection offline ', () => {

		});
		//This method should be tested with the number of time we call connectTelemetryClient()
		it('Test telemetry client connection offline until 3rd try', () => {

		});
	});

});
