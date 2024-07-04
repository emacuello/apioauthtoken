const express = require('express');
const { google } = require('googleapis');
const {
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URL,
	REFRESH_TOKEN,
	PORT,
} = require('./envs');

const app = express();

const oauth2Client = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URL
);

oauth2Client.setCredentials({
	refresh_token: REFRESH_TOKEN,
});

app.get('/', (req, res) => {
	res.send('hola, el servidor funciona');
});

app.get('/getAccessToken', async (req, res) => {
	try {
		const headers = req.headers['authorization']?.split(' ');
		if (!headers || headers.length !== 2) {
			return res.status(401).json({ error: 'Invalid headers' });
		}
		console.log('headers', headers);
		const auth = headers[1];
		console.log('auth', auth);
		if (auth !== REFRESH_TOKEN) {
			return res.status(401).json({ error: 'Invalid token' });
		}
		const { token } = await oauth2Client.getAccessToken();
		console.log(token);
		res.json({ accessToken: token });
	} catch (error) {
		res.status(500).json({ error: 'Failed to get access token' });
	}
});

app.listen(PORT, () => {
	console.log(`Auth server running on port ${PORT}`);
});
