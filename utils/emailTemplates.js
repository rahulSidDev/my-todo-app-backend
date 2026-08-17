const emailTemplates = {
    signupOtp: (otp) => ({
        subject: "Verify your MyNotes account",
        text: `
Hello,

Your verification code is:

${otp}

This code will expire in 5 minutes.

If you did not create a MyNotes account, you can ignore this email.

Regards,
MyNotes.
`.trim()}),
    forgotPasswordOtp: (otp) => ({
        subject: "Reset your MyNotes password",
        text: `
Hello,

We received a request to reset your MyNotes password.

Your verification code is:

${otp}

This code will expire in 5 minutes.

If you did not request a password reset, you can safely ignore this email.

Regards,
MyNotes.
`.trim()}),
    emailChangeOtp: (otp, newEmail) => ({
        subject: "Verify your new email address",
        text: `
Hello,

A request was made to change the email address associated with your MyNotes account.

New email address:
${newEmail}

Your verification code is:

${otp}

This code will expire in 5 minutes.

If you did not request this change, please secure your account.

Regards,
MyNotes.
`.trim()})
};

module.exports = emailTemplates;