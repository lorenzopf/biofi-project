const express = require('express'),
	app = express(),
	bodyParser = require('body-parser');
let passport = require('passport');
let session = require('express-session');
let cors = require('cors');
let flash = require('connect-flash');
let methodOverride = require('method-override');
let config = require('./db/config');
let db = require('./db/db');
swaggerUi = require('swagger-ui-express'),
	swaggerDocument = require('./swagger.json');
port = process.env.PORT || 8000;

db(config);

app.listen(port, () => console.log(`The api listening on port ${port}!`))
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors({
	origin: "http://localhost:19006",
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

let routes = require('./routes/apiRoutes');
routes(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', routes);

exports.port;

module.exports = app;
