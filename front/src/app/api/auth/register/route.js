// import validation from '@/data'
import { NextResponse } from "next/server";
import validation from '@/data/validation.js';
import {userData} from '@/data/index'

export async function POST(req) {
  try {
    const { email, password, firstName, lastName, phoneNumber, confirmPassword} = await req.json();
    // validate inputs

    // console.log({ email, password, firstName, lastName, phoneNumber, confirmPassword });

    if (password !== confirmPassword) {
        return NextResponse.error(new Error('Passwords do not match'), { status: 400 });
    }

    await userData.registerUser(firstName, lastName, email, phoneNumber, password, confirmPassword);

    // return NextResponse.json({ message: 'User registered successfully' });
    return NextResponse.redirect('http://localhost:3000/');
  } catch (e) {
    console.log({ e });
    return NextResponse.error(new Error('Registration failed'), { status: 500 });
  }
}
