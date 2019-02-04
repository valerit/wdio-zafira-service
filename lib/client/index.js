const request = require('request-promise');
const ZafiraClient = require('./client');


// handle config values, generate temporary auth Token from permanent one and create a singleton Client!!!!!
// TODO - Read Config settings!!!

const getClient = async ()  => {
	const reqOptions = {
		baseUrl: 'http://demo.qaprosoft.com/zafira-ws',
		url: '/api/auth/refresh',
		json: true,
		method: 'POST',
		body: {
			refreshToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwicGFzc3dvcmQiOiIveU45VDZZaHY5ZHRCeDNmSUFZSmxqeG12YzRObGhrMCIsInRlbmFudCI6InphZmlyYSIsImV4cCI6MTMwMzk3OTc0MzUwfQ.DuKkYg4FnU1Knyas7-YRF-wNk_Uv5wmRqmds44Z134r7VDvyoPr2KZmYZuu5dQIgErfyV4aN0e5zYgWGEebpUg'
		}
	}
	const response  = await request(reqOptions);
	const options = {
		...response,
		baseUrl: 'http://demo.qaprosoft.com/zafira-ws'
	}
	return new ZafiraClient(options);
};

module.exports = getClient();