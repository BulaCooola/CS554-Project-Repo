export const checkString = (strVal, varName) => {
  if (!strVal) throw `Error: You must supply a ${varName}!`;
  if (typeof strVal !== "string") throw `Error: ${varName} must be a string!`;
  strVal = strVal.trim();
  if (strVal.length === 0)
    throw `Error: ${varName} cannot be an empty string or a string with just spaces`;
  if (strVal.length < 2 || strVal.length > 25)
    throw `Error: ${varName} must be between 2 and 25 characters long`;
  if (strVal.match(/\d/)) throw `Error: ${varName} cannot contain numbers`;
  return strVal;
};

export const checkEmailAddress = (emailAddress) => {
  emailAddress = emailAddress.trim();
  if (!emailAddress) {
    throw `Error: You must supply an email address`;
  }
  if (typeof emailAddress !== "string")
    throw `Error: email address must be a string`;
  emailAddress = emailAddress.toLowerCase();
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(emailAddress)) {
    throw `Error: Invalid email address`;
  }
  return emailAddress;
};

//   export const checkRole = (role) => {
//     role = role.trim();
//     if (!role) throw `Error: You must supply a role!`;
//     if (typeof role !== "string") throw `Error: role must be a string`;
//     role = role.toLowerCase();
//     if (role !== "admin" && role !== "user") {
//       throw `Error: Given role is invalid`;
//     }
//     return role;
//   };

export const checkPassword = (password) => {
  if (!password)
    throw `Error: Password cannot be left empty or just empty spaces`;
  if (typeof password !== "string") throw `Error: password must be a string`;
  if (/\s/.test(password)) throw `Error: Password cannot contain spaces`;
  if (password.length < 8)
    throw `Error: Password should be at least 8 characters long`;
  if (!/\d/.test(password))
    throw `Error: Password must contain at least one digit`;
  if (!/[A-Z]/.test(password))
    throw `Error: Password must contain at least one uppercase letter`;
  if (!/[`!@#$%^&*()_+{}\|:"<>?\[\]\\;'.,\/]/.test(password))
    throw `Error: Password must contain at least one special character`;

  return password;
};
