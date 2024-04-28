// import validation from '@/data'
import { NextResponse } from "next/server";
import validation from "@/data/validation.js";
import { userData } from "@/data/index";

export async function POST(req) {
  try {
    // Get inputs from the request
    let { email, password, firstName, lastName, username, phoneNumber, confirmPassword } =
      await req.json();

    // Validating Inputs
    try {
      email = validation.validEmail(email, "Email");
      password = validation.validPassword(password, "Password");
      confirmPassword = validation.validPassword(confirmPassword, "Confirm Password");
      username = validation.checkString(username, "Username");
      firstName = validation.checkString(firstName, "First Name");
      lastName = validation.checkString(lastName, "Last Name");
      phoneNumber = validation.checkPhoneNumber(phoneNumber, "Phone Number");
    } catch (e) {
      return NextResponse.json({ error: e }, { status: 400 });
    }

    // Check passwords if they are the same
    if (password !== confirmPassword) {
      return NextResponse.error(new Error("Passwords do not match"), {
        status: 400,
      });
    }

    // Register new user to database
    const response = await userData.registerUser(
      username,
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword
    );

    return NextResponse.json({ ok: "User registered successfully" });
  } catch (e) {
    console.log({ e });
    return NextResponse.error(new Error("Registration failed"), {
      status: 500,
    });
  }
}
