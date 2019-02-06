
const getUserProfile = (client) => async (username) => {
	return client.apiRequest({
		method: 'GET',
		url: '/zafira-ws/api/users/profile?username=' + username
	})
};
