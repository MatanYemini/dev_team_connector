const express = require('express');
const connectDB = require('./config/db');
const app = express();
const userRouter = require('./routes/api/users');
const profileRouter = require('./routes/api/profile');
const postsRouter = require('./routes/api/posts');
const authRouter = require('./routes/api/auth');

connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.use('/api/users', userRouter);
app.use('/api/profile', profileRouter);
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => res.send('API RUNNING'));

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
