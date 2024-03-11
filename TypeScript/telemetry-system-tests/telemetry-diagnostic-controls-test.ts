import { expect } from 'chai';
import 'mocha';
import * as sinon from "sinon";
import TelemetryClient from "../telemetry-system/telemetry-client";
import TelemetryDiagnosticControls from '../telemetry-system/telemetry-diagnostic-controls';

describe('Telemetry System', () => {

	describe('TelemetryDiagnosticControls', () => {
		it('CheckTransmission should send a diagnostic message and receive a status message response', () => {
			const telemtryClient = new TelemetryClient();

			const telemetryDiagnosticControls = new TelemetryDiagnosticControls(telemtryClient);
			telemetryDiagnosticControls.checkTransmission();
			const diagnosticInfo = telemetryDiagnosticControls.readDiagnosticInfo();
			// tslint:disable-next-line:no-unused-expression
			expect(diagnosticInfo).not.empty;
		});

		// This method should be tested with the number of time we call connectTelemetryClient() and the exception
		it('Connect telemetry client happy path', () => {
			const telemtryClient = new TelemetryClient();
			const telemetryDiagnosticControls = new TelemetryDiagnosticControls(telemtryClient);
			telemetryDiagnosticControls.connectTelemetryClient();

			sinon.stub(telemtryClient, 'disconnect');
			sinon.stub(telemtryClient, 'connect');
			sinon.stub(telemtryClient, 'getOnlineStatus').returns(true);


			// Assert
			expect(telemetryDiagnosticControls.connectTelemetryClient).not.to.throw("Unable to connect");
			expect(telemetryDiagnosticControls.connectTelemetryClient).not.to.throw("Cannot read properties of undefined (reading \\'telemetryClient\\')");
		});

		it('Test telemetry client connection offline ', () => {
			const telemtryClient = new TelemetryClient();

			sinon.stub(telemtryClient, 'disconnect');
			sinon.stub(telemtryClient, 'connect');
			sinon.stub(telemtryClient, 'getOnlineStatus').returns(false);
			const telemetryDiagnosticControls = new TelemetryDiagnosticControls(telemtryClient);

			expect(telemetryDiagnosticControls.connectTelemetryClient).to.throw("Unable to connect");
		});

		// This method should be tested with the number of time we call connectTelemetryClient()
		it('Test telemetry client connection offline until 3rd try', () => {
			const telemtryClient = new TelemetryClient();
			const telemetryDiagnosticControls = new TelemetryDiagnosticControls(telemtryClient);
			telemetryDiagnosticControls.connectTelemetryClient();

			sinon.stub(telemtryClient, 'disconnect');
			sinon.stub(telemtryClient, 'connect');
			sinon.stub(telemtryClient, 'getOnlineStatus').returns(true);


			// Assert
			expect(telemetryDiagnosticControls.connectTelemetryClient).not.to.throw("Unable to connect");
			expect(telemetryDiagnosticControls.connectTelemetryClient).not.to.throw("Cannot read properties of undefined (reading \\'telemetryClient\\')");

		});
	});

});
