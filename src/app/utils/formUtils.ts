
/**
 * Utility function to get input field data and attributes
 * @param fieldId - The ID of the form field (input element).
 * @returns - An object containing the field's value and constraints (type, maxLength, etc.).
 */
export const getFormFieldData = (fieldId:string) => {
    const inputElement = document.getElementById(fieldId) as HTMLInputElement | null;

    // Check if the element exists
    if (!inputElement) {
        console.warn(`Element with id "${fieldId}" not found.`);
        return {
            value: '',
            type: '',
            conceptType: '',
            maxLength: null,
            minLength: null,
            minValue: null,
            maxValue: null,
            accept: null,
          };
    }
    // Proceed to gather data if the element exists
    const data = {
        value: inputElement.value,
        dataType: inputElement.getAttribute('data-type'), // data-type (text, number, etc.)
        conceptType: inputElement.getAttribute('concept-type'), // concept-type witout prefix 'the_' (name, phone, etc.)
        maxLength: inputElement.getAttribute('data-maxlength') ? parseInt(inputElement.getAttribute('data-maxlength')!) : null,
        minLength: inputElement.getAttribute('data-minlength') ? parseInt(inputElement.getAttribute('data-minlength')!) : null,
        minValue: inputElement.getAttribute('data-min') ? parseInt(inputElement.getAttribute('data-min')!) : null,
        maxValue: inputElement.getAttribute('data-max') ? parseInt(inputElement.getAttribute('data-max')!) : null,
        accept: inputElement.getAttribute('accept') || null, // For file types (document, image, etc.)
    };
    return data;
  };
