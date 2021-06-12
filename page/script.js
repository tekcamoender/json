var arrayOfJobs = [];

window.onload = () => {
	fetch("https://api.joblocal.de/v4/search-jobs").then((res) => { return res.json() }).then((response) => {
		arrayOfJobs = response.included;
		document.getElementById("isLoading").style.display = "none";
        arrayOfJobs.forEach((job) => {
			document.getElementById("dynamicData").innerHTML += `
				<div style="border:1px solid black; padding:8px">
					<img src="${job.attributes.company.logo}" alt="logo"/>
					<h1>Title: ${job.attributes.title}</h1>
					<p>Company: ${job.attributes.company.name}</p>
					<p>responsibility: ${job.attributes.responsibilities}</p>
					<p>Requirement: ${job.attributes.requirements}</p>
					<p>City: ${job.attributes.location.city}</p>
				</div><br>
            `;
        })
    })
}


document.getElementById("searchBtn").addEventListener('click', (event) =>{
    event.preventDefault();
    var searchJobKeyword = document.getElementById("input").value;
    if (searchJobKeyword == "") {
        location.reload();
    } 
	else {
        var temp = arrayOfJobs;
        arrayOfJobs = []
        temp.forEach(job => {
            if (job.attributes.title.toString().toLowerCase().includes(searchJobKeyword.toString().toLowerCase())) {
                arrayOfJobs.push(job);
            }
        })
        document.getElementById("dynamicData").innerHTML = "";
        arrayOfJobs.forEach((job) => {
            document.getElementById("dynamicData").innerHTML += `
                <div style="border:1px solid black;padding:8px">
					<img src="${job.attributes.company.logo}" alt="logo"/>
					<h1>Title: ${job.attributes.title}</h1>
					<p>Company: ${job.attributes.company.name}</p>
					<p>responsibility: ${job.attributes.responsibilities}</p>
					<p>Requirement: ${job.attributes.requirements}</p>
					<p>City: ${job.attributes.location.city}</p>
				</div>
            `;
        })
    }
})