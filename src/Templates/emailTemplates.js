// Templates/emailTemplates.js

exports.newAdminAccountTemplate = (username, email, resetUrl) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Jewellery Admin</title>
    <style>
        body {
            background-color: #f8fafc;
            font-family: 'Arial', sans-serif;
            color: #1a1a1a;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 2rem auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #9fb9e2;
            color: #ffffff;
            padding: 2rem;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            font-size: 2rem;
            font-weight: bold;
            margin: 0;
            letter-spacing: 0.05em;
        }
        .content {
            padding: 2.5rem;
            background-color: #ffffff;
        }
        .highlight {
            color: #9fb9e2;
            font-weight: bold;
        }
        .btn {
            display: inline-block;
            padding: 1rem 2.5rem;
            background-color: #9fb9e2;
            color: #ffffff;
            font-size: 1.1rem;
            font-weight: 600;
            border-radius: 50px;
            text-decoration: none;
            transition: background-color 0.3s ease;
        }
        .btn:hover {
            background-color: #8ba5d3;
        }
        .center {
            text-align: center;
            margin: 2.5rem 0;
        }
        .small {
            font-size: 0.875rem;
            color: #64748b;
        }
        .footer {
            background-color: #f1f5f9;
            padding: 2rem;
            text-align: center;
            border-radius: 0 0 8px 8px;
        }
        .social-icons {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin: 1.5rem 0;
        }
        .social-icon {
            width: 2rem;
            height: 2rem;
            fill: #9fb9e2;
        }
        .footer-links {
            font-size: 0.875rem;
            color: #64748b;
        }
        .footer-links a {
            color: #9fb9e2;
            text-decoration: none;
            margin: 0 0.5rem;
        }
        .footer-links a:hover {
            text-decoration: underline;
        }
        .sparkle {
            color: #9fb9e2;
            font-size: 1.5rem;
            margin: 0 0.5rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>✨ Welcome to Jewellery Admin ✨</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Your exclusive admin account has been crafted especially for you.</p>
            <p>Your username: <span class="highlight">${username}</span></p>
            <p>Your registered email: <span class="highlight">${email}</span></p>
            <p>To begin your journey, please set your password:</p>
            <div class="center">
                <a href="${resetUrl}" class="btn">Set Your Password</a>
            </div>
            <p class="small">Alternative link: <a href="${resetUrl}" style="color: #9fb9e2;">${resetUrl}</a></p>
            <p class="small">This link will expire in 24 hours.</p>
        </div>
        <div class="footer">
            <p>If you didn't request this account, please disregard this email.</p>
            <div class="social-icons">
                <a href="#"><img class="social-icon" src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt="LinkedIn"></a>
                <a href="#"><img class="social-icon" src="https://cdn-icons-png.flaticon.com/512/145/145802.png" alt="Facebook"></a>
                <a href="#"><img class="social-icon" src="https://cdn-icons-png.flaticon.com/512/145/145805.png" alt="Instagram"></a>
            </div>
            <div class="footer-links">
                <a href="#">Privacy Policy</a> • <a href="#">Terms of Service</a>
            </div>
        </div>
    </div>
</body>
</html>
`;