var executiveInfo;
var permission;
var centerDropdownVal = "";

function initializeData() {
  //  BootstrapDialog.alert('Sending your login details for verification');
  //var uri = "http://www.agent.winkwash.com/home";
  /*  var uri = "/home";
    $.post(uri,
      function(data, status) {
        if (data.code == 1) {
          executiveInfo = data;
          $('#userName-left').text(data.user[0].userName);
          $('#userName-top').text(data.user[0].userName);
          $('#userName-right').text(data.user[0].userName + ' - ' + data.user[0].userType);

        } else {
          BootstrapDialog.alert('Login in failed');
          location.href = "/login";
        }
      });*/

  var currentDay = new Date();
  currentDay.setHours(00);
  currentDay.setMinutes(01);
  currentDay.setDate(currentDay.getDate() - 5);
  var endDay = new Date();
  endDay.setHours(23);
  endDay.setMinutes(59);
  var dStartTime = datePickerFormat(currentDay.getTime());
  var dEndTime = datePickerFormat(endDay.getTime());
  $('#usr_start').val(dStartTime);
  $('#usr_end').val(dEndTime);
  centerDropdown();
}

function centerDropdown() {
  //var uri = "http://www.agent.winkwash.com/centers2Query";
  centerDropdownVal = "";
  var uri = "/centers2Query";
  $.post(uri,
    function(data, status) {
      if (data.code == 1) {
        //$('#userName-left').text(data.user[0].userName);
        var centerInfo = data.center;
        //  $('#center').append("<option> </option>");
        //  centerDropdownVal += "<option> </option>";
        for (var key in centerInfo) {
          if (centerInfo.hasOwnProperty(key)) {
            $('#center').append("<option value='" + centerInfo[key]._id + "' > " + centerInfo[key].name + "</option>");
            centerDropdownVal += "<option value='" + centerInfo[key]._id + "' > " + centerInfo[key].name + "</option>";
          }
        }
        // loading default selected centers route at the first time
        if (centerInfo.length > 0) {
          routeDropdown(centerInfo[0]._id);
        } else {
          $('#center').append("<option> No Center Data</option>");
          $('#query').prop('disabled', true);
        }

      } else {
        // no data found
        $('#center').append("<option> No Center Data</option>");
        $('#query').prop('disabled', true);
      }
    });
}

function routeDropdown(centerId) {
  //var uri = "http://www.agent.winkwash.com/centersRoute";
  $('#route').empty();
  var uri = "/centersRoute";
  $.post(uri, {
      "centerId": centerId
    },
    function(data, status) {
      if (data.code == 1) {
        //$('#userName-left').text(data.user[0].userName);
        var routeInfo = data.center[0].route;
        $('#route').append("<option> </option>");
        for (var key in routeInfo) {
          if (routeInfo.hasOwnProperty(key)) {
            if (routeInfo[key].active) {
              $('#route').append("<option value='" + routeInfo[key]._id + "' > " + routeInfo[key].name + "</option>");
            }
          }
        }

      } else {
        // no data found
        $('#route').append("<option> No Center Data</option>");
      }
    });
}


function addressFormat(address) {
  var addressVal = "";
  if (!(address.houseNo == '' || address.houseNo == undefined)) {
    addressVal += address.houseNo + ',';
  }
  if (!(address.street == '' || address.street == undefined)) {
    addressVal += address.street + ',';
  }
  if (!(address.area == '' || address.area == undefined)) {
    addressVal += address.area + ',';
  }
  if (!(address.landMark == '' || address.landMark == undefined)) {
    addressVal += address.landMark + ',';
  }
  if (!(address.city == '' || address.city == undefined)) {
    addressVal += address.city + ',';
  }
  if (!(address.state == '' || address.state == undefined)) {
    addressVal += address.state;
  }
  return addressVal;
}

function getformatedDate(unix_timestamp) {
  if (unix_timestamp == '' || unix_timestamp == undefined) {
    return '-';
  }
  var a = new Date(unix_timestamp * 1000);
  //var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}

function datePickerFormat(timeMillisec) {
  var dateObj = new Date(timeMillisec);
  //var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  var year = dateObj.getFullYear();
  var month = months[dateObj.getMonth()];
  var date = dateObj.getDate();
  var hour = dateObj.getHours();
  var min = dateObj.getMinutes();
  var sec = dateObj.getSeconds();
  var typeName = 'am';
  if (hour > 12) {
    typeName = 'pm';
  }

  var time = month + '/' + date + '/' + year + ' ' + hour + ':' + min + ' ' + typeName;
  return time;
}

function getLongDate(datetime) {
  var tempStart = datetime.split("/");
  var tempStime = tempStart[2].split(" ");
  var sHours = tempStime[1].split(":")[0];
  if (tempStime[2] == 'pm') {
    sHours = Number(tempStime[1].split(":")[0]) + 12;
  }
  var milliTime = new Date(tempStime[0], Number(tempStart[0]) - 1, tempStart[1], sHours, tempStime[1].split(":")[1], '00');
  return milliTime.getTime() / 1000; // Unix timestamp
  //return milliTime.getDate();
}

function validateImage(data) {
  var imageUrl = "<img src='/images/avatar.jpg' width='30px' height='30px' >";
  if (!(data == '' || data == undefined)) {
    imageUrl = "<img src='" + data + "' width='40px' height='40px' >";
  }
  return imageUrl;
}

function validateVal(data) {
  if (data == '' || data == undefined) {
    data = '-';
  }

  return data;
}

function checkStatus(checkData) {
  var data = '';
  if (checkData == '' || checkData == 'undefined') {
    data = '&#10008';
  } else if (checkData == 1) {
    data = '&#10004';
  } else {
    data = '&#10008';
  }
  return data;
}