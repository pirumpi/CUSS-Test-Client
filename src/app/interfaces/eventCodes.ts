/**
 * Common Use Self Service V2 API Definition
 * <h3>Definiton of the new CUSS2 API.</h3>This API definition idescribes IATA Common Use Self Service (IATA RP 1706c), a standard that allows multiple airlines to share physical kiosks or other hardware devices to offer self-services to their passengers. These services include, but are not limited to passenger check-in functionality and self-service baggage drop off. The standard also defines how airlines and other application suppliers can develop CUSS-compliant applications that are able to run on any device whose platform is CUSS-compliant.<br><br>The API definiton is accompanied by the CUSS Specification (CUSS-TS), describing in human readable form (textual and graphical) the concepts, requirements, interaction, workflows and behavior for both CUSS platforms and CUSS applications, and the CUSS Implementation Guide (CUSS-IG) describing best practices and giving examples on how to implement CUSS compliant platforms- and applications.<br><br>The API requires and includes further schema definitions/domains as<br><br>- CUSS2 Basic Schemas<br>- CUSS2 Self Bag Drop<br>- CUSS2 Biometrics<br>- CUSS2 Payments<br>- CUSS2 Illumination<br><br>The IATA Common Use Group (CUG) and the CUSS Technical Solution Group (CUSS-TSG) maintain this API.
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

/**
 * Virtual component state transition codes <br><br> EC_OK : Used in the returned event for calls to suspendAll, resumeAll or stopAll directives <br> EVENTHANDLING_READY : Used for soft conditions and Ok only <br> UNAVAILABLE_RELEASED_PLATFORM : Released by any authorized platform component <br> EVENTHANDLING_UNAVAILABLE : Caused by a hard condition <br> UNAVAILABLE_RELEASED_APPLICATION :  Component released by the application <br> READY_RELEASED_APPLICATION : Component released by the application <br> READY_RELEASED_PLATFORM : Released by any authorized platform component <br> RELEASED_READY : State change caused by a call to <i>acquire</i> <br> RELEASED_UNAVAILABLE : State change caused by a call to <i>acquire</i> <br>
 */
export type EventCodes = 'EC_OK' | 'EVENTHANDLING_READY' | 'UNAVAILABLE_RELEASED_PLATFORM' | 'EVENTHANDLING_UNAVAILABLE' | 'UNAVAILABLE_RELEASED_APPLICATION' | 'READY_RELEASED_APPLICATION' | 'READY_RELEASED_PLATFORM' | 'RELEASED_READY' | 'RELEASED_UNAVAILABLE';

export const EventCodes = {
    ECOK: 'EC_OK' as EventCodes,
    EVENTHANDLINGREADY: 'EVENTHANDLING_READY' as EventCodes,
    UNAVAILABLERELEASEDPLATFORM: 'UNAVAILABLE_RELEASED_PLATFORM' as EventCodes,
    EVENTHANDLINGUNAVAILABLE: 'EVENTHANDLING_UNAVAILABLE' as EventCodes,
    UNAVAILABLERELEASEDAPPLICATION: 'UNAVAILABLE_RELEASED_APPLICATION' as EventCodes,
    READYRELEASEDAPPLICATION: 'READY_RELEASED_APPLICATION' as EventCodes,
    READYRELEASEDPLATFORM: 'READY_RELEASED_PLATFORM' as EventCodes,
    RELEASEDREADY: 'RELEASED_READY' as EventCodes,
    RELEASEDUNAVAILABLE: 'RELEASED_UNAVAILABLE' as EventCodes
};