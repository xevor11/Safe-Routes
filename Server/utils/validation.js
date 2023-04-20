const { validationResult } = require('express-validator');

/**
 * Checks if the given value is a valid email address.
 *
 * @param {string} value - The value to check.
 * @returns {boolean} True if the value is a valid email address; false otherwise.
 */
function isValidEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

/**
 * Checks if the given value is a valid URL.
 *
 * @param {string} value - The value to check.
 * @returns {boolean} True if the value is a valid URL; false otherwise.
 */
function isValidUrl(value) {
  try {
    new URL(value);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Extracts and returns an array of error messages from the given Express validator result.
 *
 * @param {object} validationResult - The validation result object to extract messages from.
 * @returns {Array<string>} An array of error messages.
 */
function extractValidationErrors(validationResult) {
  return validationResult.errors.map((error) => error.msg);
}

module.exports = {
  isValidEmail,
  isValidUrl,
  extractValidationErrors,
};
