const assert = require("chai").assert;

const googleVisionHelper = require("../../lib/googleVisionHelper");
const mockTextDetectionResponse = require("../mockData/textDetection.json");
const mockLabelDetectionResponse = require("../mockData/labelDetection.json");
const mockWebDetectionResponse = require("../mockData/webDetection.json");

describe('test /lib/googleVisionHelper', function() {
  it('should parse the text detection response correctlty', function() {
    const parsedResponse = googleVisionHelper.parseTextDetectionResponse(mockTextDetectionResponse);
    assert.equal(parsedResponse.name, 'D MANIKANDAN');
    assert.equal(parsedResponse.panNumber, 'BNZPM2501F');
    assert.equal(parsedResponse.dob, '16/07/1986')
  });

  it('should parse the label detection response correctlty', function() {
    const parsedResponse = googleVisionHelper.parseLabelDetectionResponse(mockLabelDetectionResponse);
    const EXPECTED_SCORE = 0.9513536095619202;
    assert.equal(parsedResponse, EXPECTED_SCORE)
  });

  it("should parse the web detection response correctly", function() {
    const parsedResponse = googleVisionHelper.parseWebDetectionResponse(mockWebDetectionResponse);
    const EXPECTED_SCORE = 0.8873000144958496;
    assert.equal(parsedResponse, EXPECTED_SCORE)
  });
});