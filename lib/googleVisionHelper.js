const NAME_INDEX = 2,
  DATE_OF_BIRTH = 4,
  PAN_NUMBER_INDEX = 6;

const parseTextDetectionResponse = function(rawResponseBody) {
  if (!rawResponseBody || rawResponseBody.legnth == 0) {
    return null;
  }
  const textAnnotations = rawResponseBody[0].textAnnotations;
  const allText = textAnnotations && textAnnotations[0].description;
  const splitText = allText.split("\n");
  return {
    name: splitText[NAME_INDEX],
    panNumber: splitText[PAN_NUMBER_INDEX],
    dob: splitText[DATE_OF_BIRTH]
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