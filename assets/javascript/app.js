// Initialize Firebase

var config = {
apiKey: "AIzaSyA5ycH5BjhzaXZ-Vd7ZQ57Bb8o0Ty1n-Kc",
authDomain: "smellycat-bba2c.firebaseapp.com",
databaseURL: "https://smellycat-bba2c.firebaseio.com",
storageBucket: "smellycat-bba2c.appspot.com",
messagingSenderId: "714237402131"
};

firebase.initializeApp(config);

var dataRef = firebase.database();

// Initial Global Variables

var trainName = "";
var destination = "";
var firstTrainTime = 0;
var trainFrequency = 0;
var currentTime = moment();


// On Button Click

$("#add-train-btn").on("click", function(event) {
	event.preventDefault();

	trainName = $("#name-input").val().trim();
	destination = $("#destination-input").val().trim();
	firstTrainTime = $("#time-input").val().trim();
	trainFrequency = $("#frequency-input").val().trim();

	dataRef.ref().push({
		trainName: trainName,
		destination: destination,
		firstTrainTime: firstTrainTime,
		trainFrequency: trainFrequency,
		dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
});


// On Child Added or Page Load

dataRef.ref().on("child_added", function(snapshot) {

var firstTrainTimeConverted = moment(snapshot.val().firstTrainTime, "hh:mm").subtract(1, "years");
var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
var tRemainder = diffTime % snapshot.val().trainFrequency;
var tMinutesTillTrain = snapshot.val().trainFrequency - tRemainder;
var nextTrain = moment().add(tMinutesTillTrain, "minutes");

$("#train-table").append('<tr><td>' + snapshot.val().trainName + '</td><td>' + snapshot.val().destination + '</td><td>' + snapshot.val().firstTrainTime + '</td><td>' + moment(nextTrain).format("hh:mm") + '</td><td>' + tMinutesTillTrain + '</td></tr>');

}, function(errorObject) {
	console.log("Errors handled: " + errorObject.code);
});