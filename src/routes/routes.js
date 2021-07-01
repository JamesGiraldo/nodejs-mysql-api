const express = require('express');
const route = express();
const path = require('path');

/** requerir el archivos de ruta */
route.use( require('./auth') );
route.use( require('./category') );
route.use( require('./user') );
route.use( require('./commet') );
route.use( require('./post') );
route.use( require('./password') );

route.use( require('./upload') );
route.use( express.static( path.join( __dirname, '../public' ) ));

/** esportar el modulo routes, para poderlo usar donde sea XD */
module.exports = route;