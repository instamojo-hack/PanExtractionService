const moment = require("moment");

const NAME_INDEX = 2,
  DATE_OF_BIRTH = 4,
  PAN_NUMBER_INDEX = 6;

const validatePanNumber = function(panNumber) {
  panNumber = panNumber.trim();
  const re = /^[A-Z]{3}(p|P|c|C|h|H|f|F|a|A|t|T|b|B|l|L|j|J|g|G)[A-Z][\d]{4}[A-Z]$/;
  const passed = re.test(panNumber);
  console.log(`PAN number validation: ${passed}`);
  return passed;
}

const validateName = function validateName(name) {
  name = name.trim();
  let passed = false;
  const re = /^[A-Za-z\s]*$/;
  passed = re.test(name);
  console.log(`Name validation: ${passed}`);
  return passed;
}

const validateDate = function validatedate(date) {
  date = date.trim();
  let passed = false;
  passed = moment(date, "DD-MM-YYYY").isValid();
  console.log(`Date validation: ${passed}`);
  return passed
}

const validatePayload = function validatePayload(payload) {
  let passed = true;
  if (!validateDate(payload.dob) || !validatePanNumber(payload.panNumber) || !validateName(payload.name)) {
    passed = false;
  }
  return passed;
}

const parseTextDetectionResponse = function(rawResponseBody) {
  if (!rawResponseBody || rawResponseBody.legnth == 0) {
    return null;
  }
  const textAnnotations = rawResponseBody[0].textAnnotations;
  const allText = textAnnotations && textAnnotations[0].description;
  console.log(allText);
  const splitText = allText.split("\n");
  const parsedPayload =  {
    name: splitText[NAME_INDEX],
    panNumber: splitText[PAN_NUMBER_INDEX],
    dob: splitText[DATE_OF_BIRTH]
  }
  if (validatePayload(parsedPayload)) {
    return parsedPayload
  }
  else {
    return null;
  }
}

const parseLabelDetectionResponse = function parseLabelDetectionResponse(rawResponseBody) {
  if (!(rawResponseBody && rawResponseBody.length > 0 && rawResponseBody[0].labelAnnotations )) {
    return null;
  }
  const labelAnnotations = rawResponseBody[0].labelAnnotations;
  const identityDocumentField = labelAnnotations.filter(function(labelAnnotation) {
    return  labelAnnotation.description === "identity document";
  });
  return identityDocumentField && identityDocumentField.length > 0 && identityDocumentField[0].score;
}

const parseWebDetectionResponse = function parseWebDetectionResponse(rawResponseBody) {
  if (!(rawResponseBody && rawResponseBody.length > 0 && rawResponseBody[0].webDetection )) {
    return null;
  }
  const webDetection = rawResponseBody[0].webDetection;
  const webEntities = webDetection && webDetection.webEntities;
  const panField = webEntities.filter(function(webEntity) {
    return  webEntity.description === "Permanent account number";
  });
  return panField && panField.length > 0 && panField[0].score;
}

module.exports = {
  parseTextDetectionResponse: parseTextDetectionResponse,
  parseLabelDetectionResponse: parseLabelDetectionResponse,
  parseWebDetectionResponse: parseWebDetectionResponse
}