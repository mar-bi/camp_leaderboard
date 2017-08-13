import axios from 'axios';

function getTopCampersLastMonth() {
	return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent/')
	  .then(function(campers) {
	  	//console.log(campers);
	  	return campers.data;
	});
}

function getTopCampersAllTime() {
	return axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime/')
	.then(function(campers) {
		//console.log(campers);
		return campers.data;
	});
}


function getCampersData() {
	return axios.all([
			getTopCampersLastMonth(),
			getTopCampersAllTime()	
		]).then(function(campers) {
			const top30 = campers[0];
			const topAll = campers[1];

			return {
				top30: top30,
				topAll: topAll
			};
	});
} 

export const api = getCampersData;

