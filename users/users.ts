import express from 'express';

const useRouter = express.Router();

useRouter.use((req, res, next) => {
  console.log('useRouter', Date.now())
  next()
}) 

useRouter.post('/login', (req, res) => {
  res.send('login');
});

useRouter.post('/register', (req, res) => {
  res.send('register');
});

export { useRouter };
