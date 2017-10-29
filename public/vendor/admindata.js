$(document).ready(function(){
	$.ajax({
		url: "http://localhost:3000/api/pan",
		success: function(result){
			console.log(result);
			var adminHtml = '';
			$.each(result, function(k,v) {
				adminHtml += `
							<tr class="single-list">
			                  <td class="text-center baseimage" style="background-image: url('data:image/png;base64,`+v.rawImage+`');">
			                  
			                  </td>
			                  <td class="text-center">
			                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			                      <table class="table-fill table-mini">
			                        <thead>
			                          <tr class="table-mini-head">
			                            <th class="text-center server_details">Details</th>
			                            <th class="text-center status">Correct</th>
			                            <th class="text-center status">Wrong</th>
			                            <th class="text-center status">Modify</th>
			                          </tr>
			                        </thead>
			                        <tbody class="table-hover">
			                          <tr>
			                            <td class="text-center" class="name">
			                              `+v.name+`
			                            </td>
			                            <td>
			                              <input type="radio" name="data" value="correct">
			                            </td>
			                            <td>
			                              <input type="radio" name="data" value="wrong">
			                            </td>
			                            <td>
			                              <input type="radio" name="data" value="modified">
			                            </td>
			                          </tr>

			                          <tr>
			                            <td class="text-center" class="pan">
			                              `+v.panNumber+`
			                            </td>
			                            <td>
			                              <input type="radio" name="data" value="correct">
			                            </td>
			                            <td>
			                              <input type="radio" name="data" value="wrong">
			                            </td>
			                            <td>
			                              <input type="radio" name="data" value="modified">
			                            </td>
			                          </tr>

			                          <tr>
			                            <td class="text-center" class="Date">
			                              `+v.dob+`
			                            </td>
			                            <td>
			                              <input type="radio" name="data" value="correct">
			                            </td>
			                            <td>
			                              <input type="radio" name="data" value="wrong">
			                            </td>
			                            <td>
			                              <input type="radio" name="data" value="modified">
			                            </td>
			                          </tr>
			                        </tbody>
			                      </table>  
			                    </div>

			                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 feedback-btns">
			                      <button type="submit" class="btn btn-primary">Submit</button>
			                    </div>
			                  </td>
			                </tr>
							`;
				$('#adminData').html(adminHtml);
			});
		}
	});
});