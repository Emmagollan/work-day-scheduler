var taskData = [];


var updateInfo = function () {
    date = moment();
    datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

var getAndUpdateData = function () {
  // Check for info local storage
  if (localStorage.getItem('taskData')) {
    taskData = JSON.parse(localStorage.getItem('taskData'));

    for (let i= 0; i < taskData.length; i++) {
      for (j= 9; j < 18; j++) {
        if (taskData [i].hour == j) {
          $("#" + j) .val(taskData [i].content)
        }
      }
    }

  }
}

$(document).ready(function(){
    datetime = $('#currentDay')
    updateInfo();
    setInterval(updateInfo, 1000);
    updateBackground();
    getAndUpdateData();
});

 var updateBackground = function () {
 
  let hour = parseInt(date.format('H'));

  for (i = 9; i < 18; i++) {
    var textArea = $("#" + i); 

    if (i < hour) {
        textArea.addClass("past") 
    }
  
    else if (i === hour) {
        textArea.addClass("present")
    }
  
    else {
        textArea.addClass("future")

    }
  }
}
 
$(document).on('click', "button", function(event){ 
  event.preventDefault();
  let btn = $(this)
  let hour = btn.data('hour')
  let content = $("#" + hour).val()

    var exists = false

  for (let i= 0; i < taskData.length; i++) {
    const element = taskData[i];
    
    if (element['hour'] == hour) {
        
        exists = true;
        console.log("record exists")
      
        break; 
    } 
  } 
  if ( !exists ){ 
    var obt = {'hour': hour, 'content': content } 
    taskData.push(obt) 
  }  
  console.log (taskData)  

  localStorage.setItem('taskData', JSON.stringify(taskData));
});

