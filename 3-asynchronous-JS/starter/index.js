const fs = require('fs');
const superagent = require('superagent');

///////////////////////////////////////////////////////////////////////////////
// Using normal callback functions: Callback Hell

// fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
//   if (err) return console.log(err.message);
//   console.log(`Breed: ${data}`);

//   superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
//     if (err) return console.log(err.message);

//     console.log(res.body.message);
//     fs.writeFile('dog-img.txt', res.body.message, err => {
//       if (err) return console.log(err.message);
//       console.log(`Random Dog image saved to the file`);
//     });
//   });
// });

///////////////////////////////////////////////////////////////////////////////
// Using Promise returned from superagent.get method

// fs.readFile(`${__dirname}/dog.txt`, 'utf-8', (err, data) => {
//   if (err) return console.log(err.message);
//   console.log(`Breed: ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then(res => {
//       console.log(res.body.message);
//       fs.writeFile('dog-img.txt', res.body.message, err => {
//         if (err) return console.log(err.message);
//         console.log(`Random Dog image saved to the file`);
//       });
//     })
//     .catch(err => console.log(err.message));
// });

///////////////////////////////////////////////////////////////////////////////
// Promisifying the asynchronous function

// const readFilePro = function (file) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(file, 'utf-8', (err, data) => {
//       if (err) reject(err);
//       else resolve(data);
//     });
//   });
// };

// const writeFilePro = function (file, data) {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(file, data, 'utf-8', err => {
//       if (err) reject(err);
//       else resolve('success');
//     });
//   });
// };

// readFilePro(`${__dirname}/dog.txt`)
//   .then(data => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then(res => {
//     console.log(res.body.message);
//     return writeFilePro(`${__dirname}/dog-img.txt`, res.body.message);
//   })
//   .then(() => console.log('Random dog image saved to the file'))
//   .catch(err => console.log('❓', err.message));

///////////////////////////////////////////////////////////////////////////////
// Using async/await

// const readFilePro = function (file) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(file, 'utf-8', (err, data) => {
//       if (err) reject(err);
//       else resolve(data);
//     });
//   });
// };

// const writeFilePro = function (file, data) {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(file, data, 'utf-8', err => {
//       if (err) reject(err);
//       else resolve('success');
//     });
//   });
// };

// const getDogPic = async function () {
//   try {
//     const data = await readFilePro(`${__dirname}/dog.txt`);
//     console.log(`Breed: ${data}`);

//     const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//     console.log(res.body.message);

//     await writeFilePro(`${__dirname}/dog-img.txt`, res.body.message);
//     console.log('Random dog image saved to the file');
//   } catch (err) {
//     console.log('❓', err.message);
//     throw err;
//   }
//   return '2: Ready 🐶';
// };

// // Async function returns a promise
// (async () => {
//   try {
//     console.log('1: Will get dog pic!');
//     const result = await getDogPic();
//     console.log(result);
//     console.log('3: Done getting dog pic!');
//   } catch (err) {
//     console.log('❓', err.message);
//   }
// })();

///////////////////////////////////////////////////////////////////////////////
// Running Multiple promise simultaneously

const readFilePro = function (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const writeFilePro = function (file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, 'utf-8', err => {
      if (err) reject(err);
      else resolve('success');
    });
  });
};

const getDogPic = async function () {
  try {
    let data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res4 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const resArray = await Promise.all([res1, res2, res3, res4]);
    const imgs = resArray.map(res => res.body.message);
    console.log(imgs);

    await writeFilePro(`${__dirname}/dog-img.txt`, imgs.join('\n'));
    console.log('Random dog image saved to the file');
  } catch (err) {
    console.log('❓', err.message);
    throw err;
  }
  return '2: Ready 🐶';
};

// Async function returns a promise
(async () => {
  try {
    console.log('1: Will get dog pic!');
    const result = await getDogPic();
    console.log(result);
    console.log('3: Done getting dog pic!');
  } catch (err) {
    console.log('❓', err.message);
  }
})();
