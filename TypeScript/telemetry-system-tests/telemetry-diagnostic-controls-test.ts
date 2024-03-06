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

		it('Connect telemetry client happy path',() => {
			sinon.stub(telemtryClient, 'connect');
		});

		it('Test telemetry client connection offline ', () => {});

		it('Test telemetry client connection offline until 3rd try', () => {});
	});

});
