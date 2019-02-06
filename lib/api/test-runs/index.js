
const startTestRun = (client) => async (ciRunId) => {
	return client.apiRequest({
		method: 'POST',
		url: '/api/tests/runs',
		headers: {
			ciRunId: ciRunId
		}
	})
};

const finishTestRun = (client) => async (id) => {
	return client.apiRequest({
		url: `/api/tests/runs/${id}/finish`,
		method: 'POST'
	});
};

module.exports = {
	startTestRun,
	finishTestRun
}