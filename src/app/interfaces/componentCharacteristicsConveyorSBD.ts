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
 * ConveyorSBD characteristics. - Older definitions have been removed after deprecation.
 */
export interface ComponentCharacteristicsConveyorSBD { 
    /**
     * The maximum weight of the baggage (in grams).
     */
    maxWeight?: number;
    /**
     * The maximum width of baggage (in millimeters).
     */
    maxWidth?: number;
    /**
     * The maximum height of baggage (in millimeters).
     */
    maxHeight?: number;
    /**
     * The maximum length of baggage (in millimeters).
     */
    maxLength?: number;
    /**
     * The maximum number of bags a conveyor can handle.
     */
    maxBags?: number;
    /**
     * If true, conveyor has a security barrier (for user safety).
     */
    barrierCapable?: boolean;
    /**
     * If true, conveyor system can detect intrusions at the front/user side (insertion).
     */
    userInterferenceCapable?: boolean;
    /**
     * If true, conveyor system can detect intrusions behind the front/user side (verification/parking).
     */
    safetyIntrusionCapable?: boolean;
    /**
     * If true, conveyor can only move in forward direction.
     */
    onewayForward?: boolean;
}