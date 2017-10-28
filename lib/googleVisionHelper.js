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
  if (!(rawResponseBody && rawResponseBody.responses && rawResponseBody.responses.length > 0 )) {
    return null;
  }
  const labelAnnotations = rawResponseBody.responses[0].labelAnnotations;
  paarseLabelAnnotations = labelAnnotations.map(function(labelAnnotation) {
    return {description: labelAnnotation.description, score : labelAnnotation.score}
  });
  return paarseLabelAnnotations;
}

const parseWebDetectionResponse = function parseWebDetectionResponse(rawResponseBody) {
}

module.exports = {
  parsePanCardResponse: parseTextDetectionResponse,
  parseLabelDetectionResponse: parseLabelDetectionResponse,
  parseWebDetectionResponse: parseWebDetectionResponse
}