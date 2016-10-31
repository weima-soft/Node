// var url = "http://localhost:8306/select";
var url = "http://localhost:8306/insert";
var response = null;
var name ="Ale Su";
var sex = "Male";

// var data = {tb2:{"age":23}, tb1:{"age":22}};
var data = {"Galileo":{"category":"Air Availability", "Title": "Amadeus best buy command","Command":"FQBB", "HelpCommand":"H/FQBB"}};
data = JSON.stringify(data);  

$.ajax({
	type : 'POST',
	url : url,
	data : data,
	dataType : 'json',
	success : function (data) {
		alert(data);
	}
});
