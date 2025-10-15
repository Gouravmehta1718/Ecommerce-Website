const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  
//   if (!token) {
//     return res.status(403).json({ message: 'No token provided' });
//   }





  // orderRoutes.js
const authMiddleware = require('../middleware/authMiddleware'); // Import middleware

router.get('/', authMiddleware, (req, res) => {
  // This will only run if the user is logged in (session exists)
  res.status(200).json(orders);
});


  // For now, if the token is 'validToken', proceed
  if (token === process.env.AUTH_TOKEN) {
    next();
  } else {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;

