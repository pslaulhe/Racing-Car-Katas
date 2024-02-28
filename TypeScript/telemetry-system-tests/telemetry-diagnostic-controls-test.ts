import { expect } from 'chai';
import 'mocha';
import TelemetryDiagnosticControls from '../telemetry-system/telemetry-diagnostic-controls';

describe('Telemetry System', () => {

	describe('TelemetryDiagnosticControls', () => {

		it('CheckTransmission should send a diagnostic message and receive a status message response', () => {
			const telemetryDiagnosticControls = new TelemetryDiagnosticControls();
			telemetryDiagnosticControls.checkTransmission();
			const diagnosticInfo = telemetryDiagnosticControls.readDiagnosticInfo();
			// tslint:disable-next-line:no-unused-expression
			expect(diagnosticInfo).not.empty;
		});

	});

});
