import * as z from "zod"; 

export const SignupZodValidation = z.object({ 
    name: z.string().trim().min(5, 'Name should have atleast 5 characters').max(50, 'Name can have atmost 5 characters'),
    email: z.string().trim().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid Email Address"),
    password: z.string().trim().min(6, 'Password should have alteast 6 characters').max(20, "Password can only have 20 max characters")
});

export const verifyOtpValidation = z.object({
    email:  z.string().trim().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid Email Address"),
    otp: z.number()
})

export const loginDataValidation = z.object({
    email: z.string().trim().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid Credentials"),
    password: z.string().trim().min(6, 'Invalid Credentials').max(20, "Invalid Credentials")
})