const app = require('./index');
const mongoose = require('mongoose');

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('MongoDB Connected');
      console.log(`App listening at http://localhost:${process.env.PORT}`);
    })
    .catch((err) => console.log(err));
});
