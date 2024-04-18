import * as validation from "../utils/helpers.js";
import { users } from "../config/mongoCollections.js";
import bcrypt from "bcrypt";

export const registerUser = async (
  firstName,
  lastName,
  emailAddress,
  password
) => {
  firstName = validation.checkString(firstName, "First Name");
  lastName = validation.checkString(lastName, "Last Name");
  emailAddress = validation.checkEmailAddress(emailAddress);
  password = validation.checkPassword(password);

  const usersCollection = await users();
  const duplicateCheck = await usersCollection.findOne({ emailAddress });

  if (duplicateCheck) throw `Error: Given email already exists`;

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    password: encryptedPassword,
  };

  const insert = await usersCollection.insertOne(newUser);

  return { insertedUser: true };
};

export const loginUser = async (emailAddress, password) => {
  emailAddress = validation.checkEmailAddress(emailAddress);
  password = validation.checkPassword(password);

  const usersCollection = await users();

  const duplicateCheck = await usersCollection.findOne({ emailAddress });
  if (!duplicateCheck) throw `Either the email address or password is invalid`;

  const passwordCheck = await bcrypt.compare(password, duplicateCheck.password);

  if (!passwordCheck) throw `Either the email address or password is invalid`;

  return {
    firstName: duplicateCheck.firstName,
    lastName: duplicateCheck.lastName,
    emailAddress: duplicateCheck.emailAddress,
  };
};
