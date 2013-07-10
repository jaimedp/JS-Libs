//After being logged in as an admin
GROUP_TO_COPY_FROM = "04045fdc-4d68-4533-a947-84d74048d031";
SIM_TO_COPY_TO = "/harvard/project2-dev";
GROUP_TO_COPY_TO = "harvardfix";

F.API.Archive.getRuns("saved=true&step=>0&variables=^Score$&facilitator=false&group_name=" + GROUP_TO_COPY_FROM, function(a, data){
	var runs = [];
	var users = [];
	for(var i=0; i< data.run.length; i++){
		runs.push(data.run[i].runId)
		users.push(data.run[i].user.path)
	}

	console.log("found",runs.length, "runs" );
	var start = function(data){
		if(data) console.log(data)
		var firstRun = runs.pop();
		var user = users.pop();
		console.log("Initializing " + firstRun + ". for user " + user  + ". " + runs.length + " runs left");
		if(firstRun){
			var params = [
				"run_action=copy",
				"method=post",
				"group_name=" + GROUP_TO_COPY_FROM,
				"run="+ firstRun,
				"toUserEmail="+ user,
				"toGroupName=" + GROUP_TO_COPY_TO,
				"toSimulationPath=" + SIM_TO_COPY_TO
			]
			params = params.join("&")
			F.API.Archive.connect(params, start);
		}
		else{
			console.log("All runs complete");
		}
	}
	start()
})
