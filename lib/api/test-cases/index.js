
const createTestCase = (client) => async (body) => {
	return client.apiRequest({
		method: 'POST',
		url: '/api/tests/cases',
		body,
		headers: {
			Project: 'UI-JS-AUTOMATION'
		}
	});
};

const getTestMetricsById = (client) => async (id) => {
	return client.apiRequest({
		method: 'GET',
		url: `/api/tests/cases/${id}/metrics`
	});
};

module.exports = {
	createTestCase, 
	getTestMetricsById
};
