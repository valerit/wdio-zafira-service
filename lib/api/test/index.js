
const startTest = (client) => async (body) => {
	return client.apiRequest({
		url: '/api/tests',
		method: 'POST',
		body,
		headers: {
			Project: 'UI-JS-AUTOMATION'
		}
	})
};

const updateTest = (client) => async (body) => {
	return client.apiRequest({
		url: '/api/tests',
		method: 'PUT',
		body
	})
};

const finishTest = (client) => async (id, body) => {
	return client.apiRequest({
		url: `/api/tests/${id}/finish`,
		method: 'POST',
		body
	})
};

module.exports = {
	startTest,
	updateTest,
	finishTest
}