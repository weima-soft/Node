var url = "http://localhost:8306/select";
var response = null;
var name ="Ale Su";
var sex = "Male";

var data = {"age":23};
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
