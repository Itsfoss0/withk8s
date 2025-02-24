const api = require('.');
const { PORT } = require('./config/secrets.config');

api.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
