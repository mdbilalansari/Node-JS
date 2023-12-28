const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, 'localhost', () => {
  console.log(`App running on port ${port}...`);
});

// console.log(app.get('env'));
// console.log(process.env);
