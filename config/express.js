const express = require('express');
const load = require('express-load');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const validationErrors = require('express-validator');

module.exports = () => {
    const app = express();

    app.use(express.static('./app/public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(validationErrors());
    app.use(methodOverride('_method'));

    load('routes', {cwd: 'app'})
        .then('infra')
        .into(app);

    app.use((req, res, next) => {
        res.status(404).render('error/404');
        next();
    });

    app.use((err, req, res, next) => {
        res.status(500).render('error/500', {errors: err});
        next(err);
    });


    return app;
}