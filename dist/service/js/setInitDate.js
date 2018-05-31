$(function() {
  // Create start date
  var start = new Date(),
    prevDay,
    startHours = 1;
  start.setDate(start.getDate() - 5);
  // 09:00 AM
  start.setHours(1);
  start.setMinutes(0);

  // If today is Saturday or Sunday set 10:00 AM
  /*if ([6, 0].indexOf(start.getDay()) != -1) {
    start.setHours(10);
    startHours = 10
  }*/




  // If today is Saturday or Sunday set 10:00 AM
  /*if ([6, 0].indexOf(start.getDay()) != -1) {
    start.setHours(10);
    startHours = 10
  }*/

  $('#usr_start').datepicker({
    timepicker: true,
    language: 'en',
    startDate: start,
    minHours: startHours,
    maxHours: 23,
    onSelect: function(fd, d, picker) {
      // Do nothing if selection was cleared
      if (!d) return;

      var day = d.getDay();

      // Trigger only if date is changed
      if (prevDay != undefined && prevDay == day) return;
      prevDay = day;

      // If chosen day is Saturday or Sunday when set
      // hour value for weekends, else restore defaults
      // not using this function to specify Saturday and Sunday, start here
      /*
      if (day == 6 || day == 0) {
        picker.update({
          minHours: 10,
          maxHours: 16
        })
      } else {
        picker.update({
          minHours: 9,
          maxHours: 18
        })
      }*/
      // end here

    }
  })



  $('#usr_end').datepicker({
    timepicker: true,
    language: 'en',
    startDate: start,
    minHours: startHours,
    maxHours: 23,
    onSelect: function(fd, d, picker) {
      // Do nothing if selection was cleared
      if (!d) return;

      var day = d.getDay();

      // Trigger only if date is changed
      if (prevDay != undefined && prevDay == day) return;
      prevDay = day;

      // If chosen day is Saturday or Sunday when set
      // hour value for weekends, else restore defaults
      // not using this function to specify Saturday and Sunday, start here
      /*
      if (day == 6 || day == 0) {
        picker.update({
          minHours: 10,
          maxHours: 16
        })
      } else {
        picker.update({
          minHours: 9,
          maxHours: 18
        })
      }*/
      // end here

    }
  })
});