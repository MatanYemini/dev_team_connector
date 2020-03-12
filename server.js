const express = require('express');
const connectDB = require('./config/db');
const app = express();
const userRouter = require('./routes/api/users');
const profileRouter = require('./routes/api/profile');
const postsRouter = require('./routes/api/posts');
const authRouter = require('./routes/api/auth');

connectDB();

app.use('/api', userRouter);
app.use('/api', profileRouter);
app.use('/api', postsRouter);
app.use('/api', authRouter);

app.get('/', (req, res) => res.send('API RUNNING'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
