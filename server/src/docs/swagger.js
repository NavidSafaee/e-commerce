const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerAnnotation = YAML.load('./src/docs/yaml/swagger.yml');

const options = {
    definition: swaggerAnnotation,
    apis: ['./src/docs/yaml/*.yml']
}

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app) {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}

module.exports = swaggerDocs;