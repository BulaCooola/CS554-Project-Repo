// TAKEN FROM CODEBASE --> /nextjs/advanced-api-blog-nextjs-example-app-router
import { ObjectId } from "mongodb";

function includesUpper(str) {
  if (/[A-Z]+/g.test(str)) {
      return true;
  }
}
function includesNum(str) {
  if (/\d+/g.test(str)) {
      return true;
  }
  return false;
}
function includesSpecial(str) {
  if (/[^a-zA-Z0-9]/g.test(str)) {
      return true;
  }

  if (!/\d/.test(password.value)) {
      messages.push('Password must contain at least one number')
  }

  if (password.value !== confirmPassword.value) {
      messages.push('Passwords do not match');
  }

  if (messages.length > 0) {
      e.preventDefault()
      errorElement.innerText = messages.join(', ')
  }
}

const exportedMethods = {
  checkId(id) {
    if (!id) throw "Error: You must provide an id to search for";
    if (typeof id !== "string") throw "Error: id must be a string";
    id = id.trim();
    if (id.length === 0)
      throw "Error: id cannot be an empty string or just spaces";
    if (!ObjectId.isValid(id)) throw "Error: invalid object ID";
    return id;
  },
  checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== "string") throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  },
  checkStringArray(arr, varName) {
    //We will allow an empty array for this,
    //if it's not empty, we will make sure all tags are strings
    if (!arr || !Array.isArray(arr))
      throw `You must provide an array of ${varName}`;
    for (let i in arr) {
      if (typeof arr[i] !== "string" || arr[i].trim().length === 0) {
        throw `One or more elements in ${varName} array is not a string or is an empty string`;
      }
      arr[i] = arr[i].trim();
    }

    return arr;
  },
  validEmail(email, argName) {
    email = email.trim();
    email = this.checkString(email, argName).toLowerCase();
    function isValidEmail(contact) {
      const emailFormat = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/; // from https://saturncloud.io/blog/how-can-i-validate-an-email-address-using-a-regular-expression/
      return emailFormat.test(contact);
    }
    if (isValidEmail(email) === false) {
      throw `Error: Email address ${email} is invalid`;
    }
    return email;
  },
  validPassword(str) {
    const password = this.checkString(str, "Password");

    if (password.length < 5 || password.length > 75) {
      throw "Error: Password must be between 5 and 20 characters";
    }
    if (
      password.includes(" ") ||
      !includesNum(password) ||
      !includesUpper(password) ||
      !includesSpecial(password)
    ) {
      throw `Error: Password must contain at least one number, one uppercase character, and one special character`;
    }
    return password;
  },
  checkPhoneNumber(str) {
    if (typeof str !== "string") throw "Error: Phone Number must be a string";
    str = str.trim();
    if (str.length === 0)
      throw "Error: Phone Number cannot be an empty string or just spaces";
    const phoneNumberPattern = /^\d{10}$/;
    if (phoneNumberPattern.test(str)) {
      return str 
    } else {
      throw `Error: Invalid phone number.`      
    }
  }
};

export default exportedMethods;
