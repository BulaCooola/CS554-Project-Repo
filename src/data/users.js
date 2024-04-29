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
  async addUser(username, firstName, lastName, email, phoneNumber, password) {
    // Validate inputs
    try {
      username = validation.checkString(username, "Username");
      firstName = validation.checkString(firstName, "First name");
      lastName = validation.checkString(lastName, "Last name");
      email = validation.checkString(email, "Email");
      phoneNumber = validation.checkPhoneNumber(phoneNumber, "Phone Number");
      password = validation.validPassword(password);
    } catch (e) {
      throw `Error: ${e}`;
    }

    // Object with inputs
    let newUser = {
      profilePicture: undefined,
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      hometown: undefined,
      statistics: {
        games_played: 0,
        wins: 0,
        losses: 0,
      },
      ledTeams: [],
      associatedTeams: [],
      attendedTourneys: [],
    };

    // Get collection and insert new user
    const userCollection = await users();
    const newInsertInformation = await userCollection.insertOne(newUser);
    if (!newInsertInformation.insertedId) throw "Insert failed!";
    return await this.getUserById(newInsertInformation.insertedId.toString());
  },
  async editUser(id, profilePicture, username, firstName, lastName, email, phoneNumber, hometown) {
    try {
      id = validation.checkId(id);
      if (profilePicture) {
        // profilePicture = validation.validImgurLink(profilePicture, "Profile Picture");
      }
      if (userName) {
        username = validation.checkString(username, "Username");
      }
      if (firstName) {
        firstName = validation.checkString(firstName, "First name");
      }
      if (lastName) {
        lastName = validation.checkString(lastName, "Last name");
      }
      if (email) {
        email = validation.checkString(email, "Email");
      }
      if (phoneNumber) {
        phoneNumber = validation.checkPhoneNumber(phoneNumber, "Phone Number");
      }
      if (hometown) {
        hometown = validation.checkLocaation(hometown);
      }
    } catch (e) {
      throw `Error: ${e}`;
    }

    // fetch collection and find existing user
    const userCollection = await users();
    const existingUser = await userCollection.findOne({ _id: new ObjectId(id) });
    if (!existingUser) {
      throw `Error: User does not exist. Cannot edit.`;
    }

    let updateFields = {};
    if (profilePicture) {
      updateFields.profilePicture = profilePicture;
    }
    if (username) {
      updateFields.username = username;
    }
    if (firstName) {
      updateFields.firstName = firstName;
    }
    if (lastName) {
      updateFields.lastName = lastName;
    }
    if (email) {
      updateFields.email = email;
    }
    if (phoneNumber) {
      updateFields.phoneNumber = phoneNumber;
    }
    if (hometown) {
      updateFields.hometown = hometown;
    }

    if (existingUser) {
      const updateUser = await userCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateFields },
        { returnDocument: "after" }
      );
      if (existingUser === updateUser) {
        throw `Document did not update`;
      }
    }
    return await this.getUserById(id);
  },
  async registerUser(username, firstName, lastName, email, phoneNumber, password, confirmPassword) {
    try {
      username = validation.checkString(username, "Username");
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
      username,
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
    try {
      email = validation.validEmail(email, "Email ");
      password = validation.validPassword(password);

      const usersCollection = await users();

      const duplicateCheck = await usersCollection.findOne({ email });
      if (!duplicateCheck) throw `Either the email address or password is invalid`;

      const passwordCheck = await bcrypt.compare(password, duplicateCheck.password);

      if (!passwordCheck) throw `Either the email address or password is invalid`;

      return {
        _id: duplicateCheck._id,
        email: duplicateCheck.email,
        firstName: duplicateCheck.firstName,
        lastName: duplicateCheck.lastName,
        password: duplicateCheck.password,
        phone: duplicateCheck.phoneNumber,
        profilePicture: duplicateCheck.profilePicture,
      };
    } catch (e) {
      return { error: e };
    }
  },
  async checkIdArray(arr) {
    // Used to verify players during team creation
    if (!arr || !Array.isArray(arr)) throw `You must provide an array of Ids`;
    if (arr.length == 0) {
      throw `You must provide an array of Ids`;
    }
    for (let i in arr) {
      try {
        await this.getUserById(arr[i].toString());
      } catch (error) {
        throw `Error: ${e}`;
      }
    }

    return arr;
  },
};

export default exportedMethods;
