exports.newAdminAccountTemplate = (email, resetUrl) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Jewelboc</title>
    <style>
        body{background-color:#1a1536;font-family:'Helvetica Neue',Arial,sans-serif;color:#fff;margin:15px;padding:0;line-height:1.6;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
        .container{width:100%;max-width:100%;background:#1a1536}
        .header{background:linear-gradient(135deg,#1a1536,#2a2446);color:#fff;padding:1rem;text-align:center;position:relative}
        .header::after{content:'';position:absolute;bottom:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#b8c6e9,#99aee1)}
        .header h1{
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0;
            letter-spacing: .02em;
            color: #b8c6e9;
            font-family: "Lucida Handwriting", cursive;
        }
        .content{padding:1rem 0;background-color:#1a1536;color:#fff}
        .credentials-box{
            background-color:rgba(184,198,233,.1);
            border-radius:8px;
            padding:0.5rem;
            margin:1rem auto;
            border:1px solid rgba(184,198,233,.2);
            max-width:500px
        }
        .highlight{color:#b8c6e9;font-weight:600;font-size:1rem;text-decoration: none}
        .btn-container{text-align:center;margin:1rem 0}
        .btn{display:inline-block;padding:0.8rem 2rem;background-color:#99aee1;color:#1a1536 !important;font-size:1rem;font-weight:600;border-radius:20px;text-decoration:none;transition:all .3s ease}
        .btn:hover{transform:translateY(-2px);background-color:#b8c6e9}
        .expiry-notice{
            font-size:.85rem;
            color:#b8c6e9;
            background-color:rgba(184,198,233,.1);
            padding:.8rem;
            margin:1rem auto;
            border-radius:8px;
            border-left:4px solid #b8c6e9;
            max-width:800px
        }
        .footer{background-color:rgba(184,198,233,.05);padding:1rem;text-align:center;}
        .security-note{
            font-size:.8rem;
            color:#b8c6e9;
            background-color:rgba(184,198,233,.1);
            padding:.8rem;
            border-radius:8px;
            margin:1rem auto;
            text-align:left;
            max-width:800px
        }
        @media (max-width:480px){
            .header h1{font-size:1.2rem}
            .btn{padding:.6rem 1.5rem;font-size:.9rem}
            .credentials-box,.expiry-notice,.security-note{margin:.5rem;padding:.6rem}
        }
    </style>
</head>
<body style="background-color:#1a1536;font-family:'Helvetica Neue',Arial,sans-serif;color:#fff;margin:15px;padding:0;line-height:1.6">
    <div class="container">
        <div class="header">
            <h1>Welcome to Jewelboc</h1>
        </div>
        <div class="content">
            <div class="credentials-box">
                <p style="text-align: center">Email: <a href="mailto:${email}" style="color: #4F46E5 !important; text-decoration: none !important; font-weight: 600">${email}</a></p>
            </div>
            <p style="margin:1rem;text-align:center">To access your administrator account and manage Jewelboc's system, please set up your secure password:</p>
            <div class="btn-container">
                <a href="${resetUrl}" style="display:inline-block; padding:0.8rem 2rem; background-color:#99aee1; color:#1a1536 !important; font-size:1rem; font-weight:600; border-radius:20px; text-decoration:none; transition:all .3s ease">Set Up Your Password</a>
            </div>
            <div style="text-align:center;margin:1rem;word-break:break-all">
                <p style="color:#b8c6e9;font-size:.85rem">If the button doesn't work, copy and paste this URL into your browser:</p>
                <a href="${resetUrl}" style="color: #4F46E5 !important; font-size:.85rem; text-decoration: underline !important; text-decoration-color: rgba(79, 70, 229, 0.4) !important">${resetUrl}</a>
            </div>
            <div class="expiry-notice">
                <strong>Important:</strong> For security purposes, this administrator password setup link will expire in 24 hours.
            </div>
            <div class="security-note">
                <p>🔒 Security Notice: As an administrator, you will have elevated access to Jewelboc's systems. Please ensure you create a strong password combining uppercase and lowercase letters, numbers, and special characters. Never share your credentials with anyone.</p>
            </div>
        </div>
        <footer class="footer">
            <p style="color:#b8c6e9;font-size:.85rem;margin:.5rem 0">
                If you did not request this administrator account, please ignore this email.
            </p>
        </footer>
    </div>
</body>
</html>`