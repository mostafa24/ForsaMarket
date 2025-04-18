import jwt from 'jsonwebtoken';

export async function login(req, res) {
  const { username, password } = req.body;

  // هذا حساب وهمي فقط للتجربة
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
}
