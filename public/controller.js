// basic functionalities
var client;

var btnPublish = $("#publish-btn")
var rowNumber = 1;
var topicArray = [];
var test;







// client.publish("mqtt/demo", "hello world!")
$('#btn-connect').on('click', function () {
  // connect
  console.log("connect button clicked..")
  client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt")
  $("#status").text("Connecting....")
  $("#status").css("color", "yellow")
  $("#status").css("font-style", "italic")
  $("#status").css("font-weight", "bold")
  // $("#status").removeClass("alert-secondary")
  // $("#status").addClass("alert-warning")
  client.on("connect", function () {
    console.log("succ")
    $("#status").text("Connected Successfully!")
    $("#status").css("color", "green")
    $("#status").css("font-style", "italic")
    $("#status").css("font-weight", "bold")
    // $("#status").removeClass("alert-warning")
    // $("#status").addClass("alert-success")
  });// end connect

  $(".btn-disconnect").click(function () {
    client.end();
    $("#status").text("Disconnected")
    $("#status").css("color", "red")

  })//end disconnect

  //Publish 
  $("#btn-pub").click(function () {
    var topic = $("#topic").val();
    var message = $("#message").val();
    if (topic == "" || message == "") {
      Swal.fire({
        type: 'error',
        title: 'All Input is Required',
      })
    } else {
      client.publish(topic, message);
      Swal.fire({
        type: 'success',
        title: 'Publish Successfully!',
      })
    }
  })

  //Subscribe
  $("#btn-sub").click(function () {
    var topsub = $("#topic-sub").val();
    if (topsub == "") {
      Swal.fire({
        type: 'error',
        title: 'Topic is Required',
      })
    } else {
      client.subscribe(topsub);
      Swal.fire({
        type: 'success',
        title: 'Subscribe Successfully',
      })
    }
  })
  $("#btn-unsub").click(function () {
    var topsub = $("#topic-sub").val();
    if (topsub == "") {
      Swal.fire({
        type: 'error',
        title: 'Topic is Required',
      })
    } else {
      client.unsubscribe(topsub);
      Swal.fire({
        type: 'success',
        title: 'Unsubscribe Successfully',
      })
    }
    $("#btn-unsub").removeClass("alert-success")
    $("#btn-unsub").addClass("alert-secondary")
  })//end unsubscribe
  //Message
  client.on("message", function (topic, payload) {
    var row = $("<tr>")
    $("<td>").text(topic).appendTo($(row))
    $("<td>").text(payload).appendTo($(row))
    $("<td>").text(moment().format('MMMM Do YYYY, h:mm:ss a')).appendTo($(row))
    $("tbody").append($(row))
    // console.log([topic, payload].join(": "));


  })
  $("#btn-clear").click (function() {
    $("tbody").empty()
  })
  
  

})




