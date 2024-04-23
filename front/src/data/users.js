import validation from "@/data/validation.js";
import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const exportedMethods = {
  async getAllUsers() {
    const userCollection = await users();
    const userList = await userCollection.find({}).toArray();
    return userList;
  },
  async getUserById(id) {
    id = validation.checkId(id); // Check id
    const userCollection = await users(); // get collection2
    const user = await userCollection.findOne({ _id: new ObjectId(id) }); // find user
    if (!user) throw "Error: User not found";
    return user;
  },
  async addUser(firstName, lastName, email, phoneNumber, password) {
    // Validate inputs
    try {
      firstName = validation.checkString(firstName, "First name");
      lastName = validation.checkString(lastName, "Last name");
      email = validation.checkString(email, "Email");
      phoneNumber = validation.checkPhoneNumber(phoneNumber, "Phone Number");
      password = validation.validPassword(password);
    } catch (e) {
      console.error(`Server Error: ${e}`);
      throw `Server Error: ${e}`;
    }

    // Object with inputs
    let newUser = {
      profilePicture: undefined,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      activity: undefined,
    };

    // Get collection and insert new user
    const userCollection = await users();
    const newInsertInformation = await userCollection.insertOne(newUser);
    if (!newInsertInformation.insertedId) throw "Insert failed!";
    return await this.getUserById(newInsertInformation.insertedId.toString());
  },
  async registerUser(
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword
  ) {
    try {
      firstName = validation.checkString(firstName, "First Name");
      lastName = validation.checkString(lastName, "Last Name");
      email = validation.validEmail(email, "Email").toLowerCase();
      password = validation.validPassword(password);
      confirmPassword = validation.validPassword(confirmPassword);
      phoneNumber = validation.checkPhoneNumber(phoneNumber, "Phone Number");
    } catch (e) {
      throw e;
    }

    const userCollection = await users();

    const findEmail = await userCollection.findOne({
      email: email.toLowerCase(),
    });
    if (findEmail) {
      throw `Error: email already exists, pick another.`;
    }

    // const userName = email.split("@")[0];

    if (password !== confirmPassword) {
      throw "Error: Passwords must be the same";
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // call addUser
    const registeredUser = this.addUser(
      firstName,
      lastName,
      email,
      phoneNumber,
      hashedPassword
    );
    if (!registeredUser) {
      throw `Registration Failed!`;
    } else {
      return { insertedUser: true };
    }
  },
  async loginUser(email, password) {
    email = validation.validEmail(email, "Email ");
    password = validation.validPassword(password);

    const usersCollection = await users();

    const duplicateCheck = await usersCollection.findOne({ email });
    if (!duplicateCheck)
      throw `Either the email address or password is invalid`;

    const passwordCheck = await bcrypt.compare(
      password,
      duplicateCheck.password
    );

    if (!passwordCheck) throw `Either the email address or password is invalid`;

    return {
      _id: duplicateCheck._id,
      email: duplicateCheck.email,
    };
  },
  async checkIdArray(arr) {
    // Used to verify players during team creation
    if (!arr || !Array.isArray(arr)) throw `You must provide an array of Ids`;
    for (let i in arr) {
      try {
        await this.getUserById(arr[i].toString());
      } catch (error) {
        console.error(`Server Error: ${e}`);
        throw `Server Error: ${e}`;
      }
    }

    return arr;
  },
};

export default exportedMethods;
