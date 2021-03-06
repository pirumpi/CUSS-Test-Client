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
 * Interface Data Type Codes with the following semantics... <br><br> DS_TYPES_FOID_ISO : ISO track data with FOID Data truncation <br> DS_TYPES_DISCRETIONARY_ISO : ISO track data with DISCRETIONARY Data truncation <br><br> DS_TYPES_FOID_JIS2 : JIS-2 track data with FOID Data truncation <br> DS_TYPES_DISCRETIONARY_JIS2 : JIS-2 track data with DISCRETIONARY Data truncation <br><br> DS_TYPES_ISO : ISO encoded data <br> DS_TYPES_VING : VING encoded data <br> DS_TYPES_TESSA : TESSA encoded data <br> DS_TYPES_SAFLOK : SAFLOK encoded data <br> DS_TYPES_TIMELOX : TIMELOC encoded data <br> DS_TYPES_KABA_ILCO : KABA iLco encoded data <br> DS_TYPES_KABA_ILCO_FOLIO : KABA iLco (folio) enc <br><br> DS_TYPES_IMAGE_IR : Infrared image <br> DS_TYPES_IMAGE_VIS : Visible image <br> DS_TYPES_IMAGE_UV : Ultraviolet image <br> DS_TYPES_IMAGE_PHOTO : Photo image <br> DS_TYPES_IMAGE_COAX : Coaxial image <br> DS_TYPES_CODELINE : Codeline data <br> DS_TYPES_BARCODE : Barcode data <br> DS_TYPES_MIWA : Miwa data <br><br> DS_TYPES_SCAN_PDF417 : PDF417 2D barcode <br> DS_TYPES_SCAN_AZTEC : Aztec 2D barcode <br> DS_TYPES_SCAN_DMATRIX : Datamatrix 2D barcode <br> DS_TYPES_SCAN_QR : QR Code 2D barcode <br> DS_TYPES_SCAN_CODE39 : Code39 1D barcode <br> DS_TYPES_SCAN_CODE128 : Code128 1D barcode <br> DS_TYPES_SCAN_CODE2OF5 : Code2of5 1D barcode <br><br> DS_TYPES_ISO7816 : Communication protocols for PICC/RFID/NFC devices <br><br> DS_TYPES_PRINT_2S_PAGE : 2-Sided Single-page printing <br> DS_TYPES_PRINT_2S_MULTI : 2-Sided Multi-page printing <br> DS_TYPES_PRINT_PDF : Adobe PDF print format <br><br> DS_TYPES_MIFARE : Communication protocols for PICC/RFID/NFC devices <br> DS_TYPES_SUICA : Communication protocols for PICC/RFID/NFC devices <br><br> DS_TYPES_ISO15961 : IATA RFID baggage tag devices <br> DS_TYPES_RP1745 : IATA Baggage Service Messages Format <br> DS_TYPES_WEIGHT : Baggage Weight from Scale or Conveyor <br> DS_TYPES_HEAVYTAG : Special Heavy Tag for baggage <br> DS_TYPES_SBDAEA : AEA-SBD control interface <br> DS_TYPES_SBDCUSS : CUSS-SBD control interface <br><br> DS_TYPES_EPASSPORT_DG1 : e-Passport format <br> DS_TYPES_EPASSPORT_DG2 : e-Passport format <br> DS_TYPES_EPASSPORT_DG3 : e-Passport format <br> DS_TYPES_EPASSPORT_DG4 : e-Passport format <br> DS_TYPES_EPASSPORT_DG5 : e-Passport format <br> DS_TYPES_EPASSPORT_DG6 : e-Passport format <br> DS_TYPES_EPASSPORT_DG7 : e-Passport format <br> DS_TYPES_EPASSPORT_DG8 : e-Passport format <br> DS_TYPES_EPASSPORT_DG9 : e-Passport format <br> DS_TYPES_EPASSPORT_DG10 : e-Passport format <br> DS_TYPES_EPASSPORT_DG11 : e-Passport format <br> DS_TYPES_EPASSPORT_DG12 : e-Passport format <br> DS_TYPES_EPASSPORT_DG13 : e-Passport format <br> DS_TYPES_EPASSPORT_DG14 : e-Passport format <br> DS_TYPES_EPASSPORT_DG15 : e-Passport format <br> DS_TYPES_EPASSPORT_DG16 : e-Passport format <br> DS_TYPES_EPASSPORT_DG17 : e-Passport format <br> DS_TYPES_EPASSPORT_DG18 : e-Passport format <br> DS_TYPES_EPASSPORT_DG19 : e-Passport format <br> DS_TYPES_EPASSPORT_DG20 : e-Passport format <br><br> DS_TYPES_EPAYMENT : E-Payment - CUSS2 Payments Domain<br><br> DS_TYPES_ILLUMINATION : Illumination LEDs Interface - CUSS2 Illumination Domain<br><br> DS_TYPES_SSML10 : SSML Specification supported by the Announcement Interface <br> DS_TYPES_SSML11 : SSML Specification supported by the Announcement Interface <br><br> DS_TYPES_KEY : Navigation keypad events supported by Keypad Interface <br> DS_TYPES_KEY_UP : Navigation keypad event supported by Keypad Interface <br> DS_TYPES_KEY_DOWN : Navigation keypad event supported by Keypad Interface <br><br> DS_TYPES_BIOMETRIC : Biometric Interface - CUSS2 Biometrics Domain
 */
export type DataTypes = 'DS_TYPES_FOID_ISO' | 'DS_TYPES_DISCRETIONARY_ISO' | 'DS_TYPES_FOID_JIS2' | 'DS_TYPES_DISCRETIONARY_JIS2' | 'DS_TYPES_ISO' | 'DS_TYPES_VING' | 'DS_TYPES_TESSA' | 'DS_TYPES_SAFLOK' | 'DS_TYPES_TIMELOX' | 'DS_TYPES_KABA_ILCO' | 'DS_TYPES_KABA_ILCO_FOLIO' | 'DS_TYPES_IMAGE_IR' | 'DS_TYPES_IMAGE_VIS' | 'DS_TYPES_IMAGE_UV' | 'DS_TYPES_IMAGE_PHOTO' | 'DS_TYPES_IMAGE_COAX' | 'DS_TYPES_CODELINE' | 'DS_TYPES_BARCODE' | 'DS_TYPES_MIWA' | 'DS_TYPES_SCAN_PDF417' | 'DS_TYPES_SCAN_AZTEC' | 'DS_TYPES_SCAN_DMATRIX' | 'DS_TYPES_SCAN_QR' | 'DS_TYPES_SCAN_CODE39' | 'DS_TYPES_SCAN_CODE128' | 'DS_TYPES_SCAN_CODE2OF5' | 'DS_TYPES_ISO7816' | 'DS_TYPES_PRINT_2S_PAGE' | 'DS_TYPES_PRINT_2S_MULTI' | 'DS_TYPES_PRINT_PDF' | 'DS_TYPES_MIFARE' | 'DS_TYPES_SUICA' | 'DS_TYPES_ISO15961' | 'DS_TYPES_RP1745' | 'DS_TYPES_WEIGHT' | 'DS_TYPES_HEAVYTAG' | 'DS_TYPES_SBDAEA' | 'DS_TYPES_SBDCUSS' | 'DS_TYPES_EPASSPORT_DG1' | 'DS_TYPES_EPASSPORT_DG2' | 'DS_TYPES_EPASSPORT_DG3' | 'DS_TYPES_EPASSPORT_DG4' | 'DS_TYPES_EPASSPORT_DG5' | 'DS_TYPES_EPASSPORT_DG6' | 'DS_TYPES_EPASSPORT_DG7' | 'DS_TYPES_EPASSPORT_DG8' | 'DS_TYPES_EPASSPORT_DG9' | 'DS_TYPES_EPASSPORT_DG10' | 'DS_TYPES_EPASSPORT_DG11' | 'DS_TYPES_EPASSPORT_DG12' | 'DS_TYPES_EPASSPORT_DG13' | 'DS_TYPES_EPASSPORT_DG14' | 'DS_TYPES_EPASSPORT_DG15' | 'DS_TYPES_EPASSPORT_DG16' | 'DS_TYPES_EPASSPORT_DG17' | 'DS_TYPES_EPASSPORT_DG18' | 'DS_TYPES_EPASSPORT_DG19' | 'DS_TYPES_EPASSPORT_DG20' | 'DS_TYPES_EPAYMENT' | 'DS_TYPES_ILLUMINATION' | 'DS_TYPES_SSML10' | 'DS_TYPES_SSML11' | 'DS_TYPES_KEY' | 'DS_TYPES_KEY_UP' | 'DS_TYPES_KEY_DOWN' | 'DS_TYPES_BIOMETRIC';

export const DataTypes = {
    FOIDISO: 'DS_TYPES_FOID_ISO' as DataTypes,
    DISCRETIONARYISO: 'DS_TYPES_DISCRETIONARY_ISO' as DataTypes,
    FOIDJIS2: 'DS_TYPES_FOID_JIS2' as DataTypes,
    DISCRETIONARYJIS2: 'DS_TYPES_DISCRETIONARY_JIS2' as DataTypes,
    ISO: 'DS_TYPES_ISO' as DataTypes,
    VING: 'DS_TYPES_VING' as DataTypes,
    TESSA: 'DS_TYPES_TESSA' as DataTypes,
    SAFLOK: 'DS_TYPES_SAFLOK' as DataTypes,
    TIMELOX: 'DS_TYPES_TIMELOX' as DataTypes,
    KABAILCO: 'DS_TYPES_KABA_ILCO' as DataTypes,
    KABAILCOFOLIO: 'DS_TYPES_KABA_ILCO_FOLIO' as DataTypes,
    IMAGEIR: 'DS_TYPES_IMAGE_IR' as DataTypes,
    IMAGEVIS: 'DS_TYPES_IMAGE_VIS' as DataTypes,
    IMAGEUV: 'DS_TYPES_IMAGE_UV' as DataTypes,
    IMAGEPHOTO: 'DS_TYPES_IMAGE_PHOTO' as DataTypes,
    IMAGECOAX: 'DS_TYPES_IMAGE_COAX' as DataTypes,
    CODELINE: 'DS_TYPES_CODELINE' as DataTypes,
    BARCODE: 'DS_TYPES_BARCODE' as DataTypes,
    MIWA: 'DS_TYPES_MIWA' as DataTypes,
    SCANPDF417: 'DS_TYPES_SCAN_PDF417' as DataTypes,
    SCANAZTEC: 'DS_TYPES_SCAN_AZTEC' as DataTypes,
    SCANDMATRIX: 'DS_TYPES_SCAN_DMATRIX' as DataTypes,
    SCANQR: 'DS_TYPES_SCAN_QR' as DataTypes,
    SCANCODE39: 'DS_TYPES_SCAN_CODE39' as DataTypes,
    SCANCODE128: 'DS_TYPES_SCAN_CODE128' as DataTypes,
    SCANCODE2OF5: 'DS_TYPES_SCAN_CODE2OF5' as DataTypes,
    ISO7816: 'DS_TYPES_ISO7816' as DataTypes,
    PRINT2SPAGE: 'DS_TYPES_PRINT_2S_PAGE' as DataTypes,
    PRINT2SMULTI: 'DS_TYPES_PRINT_2S_MULTI' as DataTypes,
    PRINTPDF: 'DS_TYPES_PRINT_PDF' as DataTypes,
    MIFARE: 'DS_TYPES_MIFARE' as DataTypes,
    SUICA: 'DS_TYPES_SUICA' as DataTypes,
    ISO15961: 'DS_TYPES_ISO15961' as DataTypes,
    RP1745: 'DS_TYPES_RP1745' as DataTypes,
    WEIGHT: 'DS_TYPES_WEIGHT' as DataTypes,
    HEAVYTAG: 'DS_TYPES_HEAVYTAG' as DataTypes,
    SBDAEA: 'DS_TYPES_SBDAEA' as DataTypes,
    SBDCUSS: 'DS_TYPES_SBDCUSS' as DataTypes,
    EPASSPORTDG1: 'DS_TYPES_EPASSPORT_DG1' as DataTypes,
    EPASSPORTDG2: 'DS_TYPES_EPASSPORT_DG2' as DataTypes,
    EPASSPORTDG3: 'DS_TYPES_EPASSPORT_DG3' as DataTypes,
    EPASSPORTDG4: 'DS_TYPES_EPASSPORT_DG4' as DataTypes,
    EPASSPORTDG5: 'DS_TYPES_EPASSPORT_DG5' as DataTypes,
    EPASSPORTDG6: 'DS_TYPES_EPASSPORT_DG6' as DataTypes,
    EPASSPORTDG7: 'DS_TYPES_EPASSPORT_DG7' as DataTypes,
    EPASSPORTDG8: 'DS_TYPES_EPASSPORT_DG8' as DataTypes,
    EPASSPORTDG9: 'DS_TYPES_EPASSPORT_DG9' as DataTypes,
    EPASSPORTDG10: 'DS_TYPES_EPASSPORT_DG10' as DataTypes,
    EPASSPORTDG11: 'DS_TYPES_EPASSPORT_DG11' as DataTypes,
    EPASSPORTDG12: 'DS_TYPES_EPASSPORT_DG12' as DataTypes,
    EPASSPORTDG13: 'DS_TYPES_EPASSPORT_DG13' as DataTypes,
    EPASSPORTDG14: 'DS_TYPES_EPASSPORT_DG14' as DataTypes,
    EPASSPORTDG15: 'DS_TYPES_EPASSPORT_DG15' as DataTypes,
    EPASSPORTDG16: 'DS_TYPES_EPASSPORT_DG16' as DataTypes,
    EPASSPORTDG17: 'DS_TYPES_EPASSPORT_DG17' as DataTypes,
    EPASSPORTDG18: 'DS_TYPES_EPASSPORT_DG18' as DataTypes,
    EPASSPORTDG19: 'DS_TYPES_EPASSPORT_DG19' as DataTypes,
    EPASSPORTDG20: 'DS_TYPES_EPASSPORT_DG20' as DataTypes,
    EPAYMENT: 'DS_TYPES_EPAYMENT' as DataTypes,
    ILLUMINATION: 'DS_TYPES_ILLUMINATION' as DataTypes,
    SSML10: 'DS_TYPES_SSML10' as DataTypes,
    SSML11: 'DS_TYPES_SSML11' as DataTypes,
    KEY: 'DS_TYPES_KEY' as DataTypes,
    KEYUP: 'DS_TYPES_KEY_UP' as DataTypes,
    KEYDOWN: 'DS_TYPES_KEY_DOWN' as DataTypes,
    BIOMETRIC: 'DS_TYPES_BIOMETRIC' as DataTypes
};