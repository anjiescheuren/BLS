$(function() {
  $.ajax({
      type: 'GET',
      headers: {"http://localhost:3000": "localhost"},
      url: 'https://api.bls.gov/publicAPI/v1/timeseries/data/APU0000702421',
      data: { },
      dataType: 'json'
    })
      .done(function(data) {
        console.log(data);
      })
  // $.ajax({
  //   type: "GET",
  //   headers: {"http://localhost:3000/": "localhost"},
  //   url: "https://api.bls.gov/publicAPI/v1/timeseries/data/APU0000702421"
  // }).done(function (data) {
  //   console.log(data);
  //   });
});
