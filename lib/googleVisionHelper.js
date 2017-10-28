const NAME_INDEX = 2,
  DATE_OF_BIRTH = 4,
  PAN_NUMBER_INDEX = 6;

const parsePanCardResponse = function(rawResponseBody) {
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

module.exports = {
  parsePanCardResponse: parsePanCardResponse
}