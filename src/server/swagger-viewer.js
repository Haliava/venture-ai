import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
const swaggerDocument = YAML.load('./src/server/swagger.yml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Swagger UI running at http://localhost:${PORT}/api-docs`);
});