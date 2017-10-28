const assert = require("chai").assert;

const googleVisionHelper = require("../../lib/googleVisionHelper");
const mockTextDetectionResponse = require("../mockData/textDetection.json");
const mockLabelDetectionResponse = require("../mockData/textDetection.json");

describe('test /lib/googleVisionHelper', function() {
  it('should parse the text detection response correctlty', function() {
    const parsedResponse = googleVisionHelper.parseTextDetectionResponse(mockTextDetectionResponse);
    assert.equal(parsedResponse.name, 'D MANIKANDAN');
    assert.equal(parsedResponse.panNumber, 'BNZPM2501F');
    assert.equal(parsedResponse.dob, '16/07/1986')
  });

  it('should parse the label detection response correctlty', function() {
    const parsedResponse = googleVisionHelper.parseLabelDetectionResponse(mockTextDetectionResponse);
    assert.equal(parsedResponse.name, 'D MANIKANDAN');
    assert.equal(parsedResponse.panNumber, 'BNZPM2501F');
    assert.equal(parsedResponse.dob, '16/07/1986')
  });
});