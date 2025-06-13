// import express from 'express';
// import cors from 'cors';
// import 'dotenv/config'; 

// import connectDB from './config/mongodb.js'
// import userRouter from './routes/userRouts.js';
// import imageRouter from './routes/imageRoutes.js';
// const PORT = process.env.PORT || 4000;
// const app = express();

// app.use(express.json());
// app.use(cors());

// await connectDB()
// app.use('/api/user',userRouter)
// app.use('/api/image',imageRouter)
// app.get('/', (req, res) => res.send("API Working"));

// app.listen(PORT, () => console.log('Server running on port' + PORT)); 

 
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './config/mongodb.js';
import userRouter from './routes/userRouts.js';
import imageRouter from './routes/imageRoutes.js';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());

const startServer = async () => {
  try {
    await connectDB();

    app.use('/api/user', userRouter);
    app.use('/api/image', imageRouter);
    app.get('/', (req, res) => res.send("API Working"));

    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
};

startServer();
