const dotenv = require('dotenv');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

module.exports = {
	CLIENT_ID: process.env.CLIENT_ID,
	CLIENT_SECRET: process.env.CLIENT_SECRET,
	REDIRECT_URL: process.env.REDIRECT_URL,
	REFRESH_TOKEN: process.env.REFRESH_TOKEN,
	PORT: process.env.PORT,
};
