export async function login(req, res) { res.json({ token: 'todo' }); }
export async function register(req, res) { res.status(201).json({}); }
