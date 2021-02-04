import { EnvironmentComponent } from "../interfaces/environmentComponent";
import { RequiredDevices } from '../interfaces/requiredDevices';
import { ComponentName } from '../interfaces/componentNames';
import { EventCodes } from '../interfaces/eventCodes';
import { StatusCodes } from '../interfaces/statusCodes';

/**
 * Find a barcode reader by component's characteristics
 * @param comp Component device
 */
export const isBarcodeReader = (comp: EnvironmentComponent): boolean => {
    // TBD
    return false;
};
/**
 * Find a bbagtag printer by component's characteristics
 * @param comp Component device
 */
export const isBagtagPrinter = (comp: EnvironmentComponent): boolean => {
    // TBD
    return false;
};
/**
 * Find a boardingpass printer by component's characteristics
 * @param comp Component device
 */
export const isBoardingpassPrinter = (comp: EnvironmentComponent): boolean => {
    // TBD
    return false;
};
/**
 * Find a passport reader by component's characteristics
 * @param comp Component device
 */
export const isPassportReader = (comp: EnvironmentComponent): boolean => {
    // TBD
    return false;
};
/**
 * Find a display by component's characteristics
 * @param comp Component device
 */
export const isDisplay = (comp: EnvironmentComponent): boolean => {
    // TBD
    return false;
};

/**
 * 
 * @param comps Component Device
 * @param list Available components in the cuss platform
 */
export const componentFinder = (comps: RequiredDevices[], list: EnvironmentComponent[]) => {
    comps.forEach(comp => findComponents(comp, list));
};

const isValidEventCode = (eventCode: EventCodes): boolean => {
    // TBD
    return false;
};
const isValidStatusCode = (statusCode: StatusCodes): boolean => {
    // TBD
    return false;
};

/**
 * 
 * @param comp Components required by the cuss application
 * @param list List of available components in the cuss platform
 */
const findComponents = (comp: RequiredDevices, list: EnvironmentComponent[]) => {

    switch (comp.name) {
        case ComponentName.BAGTAG_PRINTER:
            updateObject(comp, isBagtagPrinter, list);
            break;
        case ComponentName.BARCODE_READER:
            updateObject(comp, isBarcodeReader, list);
            break;
        case ComponentName.BOARDINGPASS_PRINTER:
            updateObject(comp, isBoardingpassPrinter, list);
            break;
        case ComponentName.PASSPORT_READER:
            updateObject(comp, isPassportReader, list);
            break;
        case ComponentName.DISPLAY:
            updateObject(comp, isDisplay, list);
            break;

    }
}

const updateObject = (comp: RequiredDevices, filterFnc, list: EnvironmentComponent[]) => {
    const found = list.find(c => filterFnc(c));
    if (found) {
        comp.found, comp.status= isValidEventCode(found.eventCode) && isValidStatusCode(found.statusCode);
    }
};


