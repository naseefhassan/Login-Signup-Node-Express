function middleware(req, res, next) {
  const { name, email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const isValidEmail = emailRegex.test(email);
  const isValidPassword = passwordRegex.test(password);
  
   if(!isValidEmail || !isValidPassword){
    return res.status(400).send("invalid email or password format")
   }
  next();
}
module.exports = middleware;
