// Templates/emailTemplates.js

// Templates/emailTemplates.js
exports.newAdminAccountTemplate = (username, email, resetUrl) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to GeekCRM</title>
    <style>
        body {
            background-color: #f7fafc;
            font-family: sans-serif;
            color: #2d3748;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 768px;
            margin: 3rem auto;
            background-color: #ffffff;
            border-radius: 0.5rem;
            box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #2c5282;
            color: #ffffff;
            padding: 1.5rem;
            text-align: center;
        }
        .header h1 {
            font-size: 1.5rem;
            font-weight: bold;
            margin: 0;
        }
        .content {
            padding: 2rem;
            background-color: #f7fafc;
        }
        .highlight {
            color: #2c5282;
            font-weight: bold;
        }
        .btn {
            display: inline-block;
            padding: 0.75rem 2rem;
            background-color: #3182ce;
            color: #ffffff;
            font-size: 1.125rem;
            font-weight: 600;
            border-radius: 0.375rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-decoration: none;
            text-align: center;
        }
        .center {
            text-align: center;
            margin-bottom: 2rem;
        }
        .small {
            font-size: 0.875rem;
            color: #718096;
        }
        .footer {
            background-color: #edf2f7;
            padding: 1.5rem;
            text-align: center;
            color: #718096;
            font-size: 0.875rem;
        }
        .social-icons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 1rem;
        }
        .social-icons svg {
            width: 1.5rem;
            height: 1.5rem;
        }
        .footer-links {
            font-size: 0.75rem;
        }
        .footer-links a {
            text-decoration: underline;
            color: #3182ce;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to GeekCRM</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Your admin account has been successfully created by the GeekCRM team.</p>
            <p>Your username is: <span class="highlight">${username}</span></p>
            <p>Your registered email is: <span class="highlight">${email}</span></p>
            <p>To set your password, please click the button below:</p>
            <div class="center">
                <a href="${resetUrl}" class="btn">Set Your Password</a>
            </div>
            <p class="small">Or click this link: <a href="${resetUrl}" style="color: #3182ce;">${resetUrl}</a></p>
            <p class="small">This link will expire in 24 hours.</p>
        </div>
        <div class="footer">
            <p>If you did not request this account, please ignore this email.</p>
            <div class="social-icons">
                <a href="#" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28.87 28.87" id="linkedin"><g><g><rect width="28.87" height="28.87" fill="#0b86ca" rx="6.48" ry="6.48"></rect><path fill="#fff" d="M8 12h3v9.68H8zm1.53-4.81a1.74 1.74 0 11-1.74 1.75 1.74 1.74 0 011.74-1.75M12.92 12h2.89v1.32a3.16 3.16 0 012.85-1.56c3 0 3.61 2 3.61 4.61v5.31h-3V17c0-1.12 0-2.57-1.56-2.57s-1.8 1.22-1.8 2.48v4.79h-3z"></path></g></g></svg>
                </a>
                <a href="#" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 6.827 6.827" id="facebook"><rect width="6.827" height="6.827" fill="#1976d2" rx="1.456" ry="1.456"></rect><path fill="#fff" d="M4.197 3.513H3.65v2.004H2.82V3.513h-.394v-.704h.394v-.456c0-.326.155-.836.836-.836l.614.002v.684h-.446c-.073 0-.175.036-.175.192v.414h.62l-.073.704z"></path></svg>
                </a>
                <a href="#" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" id="instagram"><linearGradient id="a" x1="-37.094" x2="-26.555" y1="-72.719" y2="-84.047" gradientTransform="matrix(0 -1.982 -1.8439 0 -132.522 -51.077)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd5"></stop><stop offset=".5" stop-color="#ff543e"></stop><stop offset="1" stop-color="#c837ab"></stop></linearGradient><path fill="url(#a)" d="m1.5 1.633c-1.886 1.959-1.5 4.04-1.5 10.362 0 6.336-.158 7.499.602 9.075.635 1.318 1.848 2.308 3.276 2.677 1.144.294 1.904.253 8.1.253 5.194 0 6.81.093 8.157-.255 1.996-.515 3.62-2.134 3.842-4.957.031-.394.031-13.185-.001-13.587-.236-3.007-2.087-4.74-4.526-5.091-.56-.081-.672-.105-3.54-.11-10.173.005-12.403-.448-14.41 1.633z"></path><path fill="#fff" d="m11.998 3.139c-3.631 0-7.079-.323-8.396 3.057-.544 1.396-.465 3.209-.465 5.805 0 2.278-.073 4.419.465 5.804 1.314 3.382 4.79 3.058 8.394 3.058 3.477 0 7.062.362 8.395-3.058.545-1.41.465-3.196.465-5.804 0-3.462.191-5.697-1.488-7.375-1.7-1.7-3.999-1.487-7.374-1.487zm-.794 1.597c4.346-.007 7.811-.607 8.006 3.683.072 1.589.072 5.571 0 7.16-.189 4.137-3.339 3.683-7.211 3.683-3.412 0-5.104.121-6.244-1.02-1.157-1.157-1.019-2.811-1.019-6.245 0-4.071-.385-7.026 3.683-7.213.817-.037 1.134-.048 2.785-.05zm5.524 1.471c-.587 0-1.063.476-1.063 1.063s.476 1.063 1.063 1.063 1.063-.476 1.063-1.063-.476-1.063-1.063-1.063zm-4.73 1.243c-2.513 0-4.55 2.038-4.55 4.551s2.037 4.55 4.55 4.55 4.549-2.037 4.549-4.55-2.036-4.551-4.549-4.551zm0 1.597c1.631 0 2.953 1.323 2.953 2.954s-1.322 2.954-2.953 2.954-2.953-1.323-2.953-2.954c0-1.632 1.322-2.954 2.953-2.954z"></path></svg>
                </a>
            </div>
            <div class="footer-links">
                <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
            </div>
        </div>
    </div>
</body>
</html>
`;