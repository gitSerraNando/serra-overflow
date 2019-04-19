import Debug from 'debug';
import app from './app';
import mongoose from 'mongoose';
import { mongoUrl } from './config';

const PORT = 3000;
const debug = new Debug('serra-overflow:root');

mongoose.Promise = global.Promise;

async function start() {
  mongoose.set('useCreateIndex', true);
  await mongoose.connect(mongoUrl, { useNewUrlParser: true });

  app.listen(PORT, () => {
    debug(`Server running at port ${PORT}`);
  });
}

start();
