import { DATA_TYPES_RULES } from "../utils/constants";

/**
 * Interface representing form validation errors.
 * Each key is a form field name, and the value is either a string error message or undefined if the field is valid.
 */
export interface FormErrors {
    [key: string]: string | undefined;
}


/**
 * Validates a single form field based on its data type.
 * It checks the value against the regex pattern defined in `DATA_TYPES_RULES` for the provided data type.
 * 
 * @param fieldName - The name of the field being validated (e.g., "email", "phone").
 * @param dataType - The expected data type for the field (e.g., "text", "number").
 * @param value - The value of the field to validate.
 * 
 * @returns A string error message if validation fails, or `undefined` if the field is valid.
 */
export const validateField = (
    fieldName: string,
    dataType: string,
    value: string
): string | undefined => {
    const pattern = DATA_TYPES_RULES[dataType];
    // console.log(`Validating ${fieldName}:`, { pattern, value });
    if (pattern && !pattern.test(value)) {
        return `Invalid format for ${dataType} in ${fieldName}`;
    }
    return undefined;
};

/**
 * Validates all form fields by iterating over the provided form data.
 * It checks each field's value and data type, collecting errors where necessary.
 * 
 * @param formData - An object representing the form data, where each key is a field name 
 *                   and each value is an object containing the `value` and `dataType` for the field.
 * 
 * @returns An object containing validation errors for fields that failed validation.
 *          If no errors exist, the object will be empty.
 */
export const validateFormData = (formData : { [key:string] : {value:string; dataType:string}}): FormErrors => {
    const errors : FormErrors = {};
    for (const fieldName in formData) {
        const {value, dataType} = formData[fieldName];
        const error = validateField(fieldName, dataType, value);
        // console.log(`Check ${fieldName} - ${value} - ${dataType} and error : ${error}`);
        
        if (error) errors[fieldName] = error;
    }
    return errors
}