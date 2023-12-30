const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

// CONNECT TO DB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('DB connection successful');
  })
  .catch(err => {
    console.log('DB connection failed: ', err);
  });

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

(async function() {
  try {
    // IMPORT DATA INTO BD
    if (process.argv[2] === '--import') {
      await Tour.create(tours);
      console.log('Data successfully loaded!');
    }
    // DELETE DATA FROM DB
    if (process.argv[2] === '--delete') {
      await Tour.deleteMany();
      console.log('Data successfully deleted!');
    }
  } catch (err) {
    console.log(err);
  } finally {
    mongoose.connection.close(() => {
      console.log('DB connection closed successfully');
    });
  }
})();
