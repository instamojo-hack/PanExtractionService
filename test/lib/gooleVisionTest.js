const assert = require("chai").assert;

const googleVisionHelper = require("../../lib/googleVisionHelper");
const mockResponseData = require("../mockData/googleVisionSample.json");

describe('test /lib/googleVisionHelper', function() {
  it('should parse the response correctlty', function() {
    const parsedResponse = googleVisionHelper.parsePanCardResponse(mockResponseData);
    assert.equal(parsedResponse.name, 'D MANIKANDAN');
    assert.equal(parsedResponse.panNumber, 'BNZPM2501F');
    assert.equal(parsedResponse.dob, '16/07/1986')
  });
});