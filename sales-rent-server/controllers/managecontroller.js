// register, login, approve, report, dashboard, subscription handling

// after login directly to the dashboard

// api/manager/dashboard/report/date/monthly/subscription
// api/manager/dashboard/report/date/year/

function SignUp(req, res) {
    const { username, password } = req.body;
    if (!username && !password) {
        res.status(400).json({ message: 'Username and password are required' });
    }
    else if (username === "admin" && password === "admin") {
        res.status(200).json({ message: 'Welcome to your admin account' });
    }
    else {
        res.status(500).json({ message: 'Invalid username or password from else' });
    }
};

module.exports = SignUp;