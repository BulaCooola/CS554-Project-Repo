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
    messages.push("Password must contain at least one number");
  }

  if (password.value !== confirmPassword.value) {
    messages.push("Passwords do not match");
  }

  if (messages.length > 0) {
    e.preventDefault();
    errorElement.innerText = messages.join(", ");
  }
}
// https://gist.github.com/incredimike/1469814
const countryListAlpha3 = {
  AFG: "Afghanistan",
  ALB: "Albania",
  DZA: "Algeria",
  ASM: "American Samoa",
  AND: "Andorra",
  AGO: "Angola",
  AIA: "Anguilla",
  ATA: "Antarctica",
  ATG: "Antigua and Barbuda",
  ARG: "Argentina",
  ARM: "Armenia",
  ABW: "Aruba",
  AUS: "Australia",
  AUT: "Austria",
  AZE: "Azerbaijan",
  BHS: "Bahamas (the)",
  BHR: "Bahrain",
  BGD: "Bangladesh",
  BRB: "Barbados",
  BLR: "Belarus",
  BEL: "Belgium",
  BLZ: "Belize",
  BEN: "Benin",
  BMU: "Bermuda",
  BTN: "Bhutan",
  BOL: "Bolivia (Plurinational State of)",
  BES: "Bonaire, Sint Eustatius and Saba",
  BIH: "Bosnia and Herzegovina",
  BWA: "Botswana",
  BVT: "Bouvet Island",
  BRA: "Brazil",
  IOT: "British Indian Ocean Territory (the)",
  BRN: "Brunei Darussalam",
  BGR: "Bulgaria",
  BFA: "Burkina Faso",
  BDI: "Burundi",
  CPV: "Cabo Verde",
  KHM: "Cambodia",
  CMR: "Cameroon",
  CAN: "Canada",
  CYM: "Cayman Islands (the)",
  CAF: "Central African Republic (the)",
  TCD: "Chad",
  CHL: "Chile",
  CHN: "China",
  CXR: "Christmas Island",
  CCK: "Cocos (Keeling) Islands (the)",
  COL: "Colombia",
  COM: "Comoros (the)",
  COD: "Congo (the Democratic Republic of the)",
  COG: "Congo (the)",
  COK: "Cook Islands (the)",
  CRI: "Costa Rica",
  HRV: "Croatia",
  CUB: "Cuba",
  CUW: "Curaçao",
  CYP: "Cyprus",
  CZE: "Czechia",
  CIV: "Côte d'Ivoire",
  DNK: "Denmark",
  DJI: "Djibouti",
  DMA: "Dominica",
  DOM: "Dominican Republic (the)",
  ECU: "Ecuador",
  EGY: "Egypt",
  SLV: "El Salvador",
  GNQ: "Equatorial Guinea",
  ERI: "Eritrea",
  EST: "Estonia",
  SWZ: "Eswatini",
  ETH: "Ethiopia",
  FLK: "Falkland Islands (the) [Malvinas]",
  FRO: "Faroe Islands (the)",
  FJI: "Fiji",
  FIN: "Finland",
  FRA: "France",
  GUF: "French Guiana",
  PYF: "French Polynesia",
  ATF: "French Southern Territories (the)",
  GAB: "Gabon",
  GMB: "Gambia (the)",
  GEO: "Georgia",
  DEU: "Germany",
  GHA: "Ghana",
  GIB: "Gibraltar",
  GRC: "Greece",
  GRL: "Greenland",
  GRD: "Grenada",
  GLP: "Guadeloupe",
  GUM: "Guam",
  GTM: "Guatemala",
  GGY: "Guernsey",
  GIN: "Guinea",
  GNB: "Guinea-Bissau",
  GUY: "Guyana",
  HTI: "Haiti",
  HMD: "Heard Island and McDonald Islands",
  VAT: "Holy See (the)",
  HND: "Honduras",
  HKG: "Hong Kong",
  HUN: "Hungary",
  ISL: "Iceland",
  IND: "India",
  IDN: "Indonesia",
  IRN: "Iran (Islamic Republic of)",
  IRQ: "Iraq",
  IRL: "Ireland",
  IMN: "Isle of Man",
  ISR: "Israel",
  ITA: "Italy",
  JAM: "Jamaica",
  JPN: "Japan",
  JEY: "Jersey",
  JOR: "Jordan",
  KAZ: "Kazakhstan",
  KEN: "Kenya",
  KIR: "Kiribati",
  PRK: "Korea (the Democratic People's Republic of)",
  KOR: "Korea (the Republic of)",
  KWT: "Kuwait",
  KGZ: "Kyrgyzstan",
  LAO: "Lao People's Democratic Republic (the)",
  LVA: "Latvia",
  LBN: "Lebanon",
  LSO: "Lesotho",
  LBR: "Liberia",
  LBY: "Libya",
  LIE: "Liechtenstein",
  LTU: "Lithuania",
  LUX: "Luxembourg",
  MAC: "Macao",
  MDG: "Madagascar",
  MWI: "Malawi",
  MYS: "Malaysia",
  MDV: "Maldives",
  MLI: "Mali",
  MLT: "Malta",
  MHL: "Marshall Islands (the)",
  MTQ: "Martinique",
  MRT: "Mauritania",
  MUS: "Mauritius",
  MYT: "Mayotte",
  MEX: "Mexico",
  FSM: "Micronesia (Federated States of)",
  MDA: "Moldova (the Republic of)",
  MCO: "Monaco",
  MNG: "Mongolia",
  MNE: "Montenegro",
  MSR: "Montserrat",
  MAR: "Morocco",
  MOZ: "Mozambique",
  MMR: "Myanmar",
  NAM: "Namibia",
  NRU: "Nauru",
  NPL: "Nepal",
  NLD: "Netherlands (the)",
  NCL: "New Caledonia",
  NZL: "New Zealand",
  NIC: "Nicaragua",
  NER: "Niger (the)",
  NGA: "Nigeria",
  NIU: "Niue",
  NFK: "Norfolk Island",
  MNP: "Northern Mariana Islands (the)",
  NOR: "Norway",
  OMN: "Oman",
  PAK: "Pakistan",
  PLW: "Palau",
  PSE: "Palestine, State of",
  PAN: "Panama",
  PNG: "Papua New Guinea",
  PRY: "Paraguay",
  PER: "Peru",
  PHL: "Philippines (the)",
  PCN: "Pitcairn",
  POL: "Poland",
  PRT: "Portugal",
  PRI: "Puerto Rico",
  QAT: "Qatar",
  MKD: "Republic of North Macedonia",
  ROU: "Romania",
  RUS: "Russian Federation (the)",
  RWA: "Rwanda",
  REU: "Réunion",
  BLM: "Saint Barthélemy",
  SHN: "Saint Helena, Ascension and Tristan da Cunha",
  KNA: "Saint Kitts and Nevis",
  LCA: "Saint Lucia",
  MAF: "Saint Martin (French part)",
  SPM: "Saint Pierre and Miquelon",
  VCT: "Saint Vincent and the Grenadines",
  WSM: "Samoa",
  SMR: "San Marino",
  STP: "Sao Tome and Principe",
  SAU: "Saudi Arabia",
  SEN: "Senegal",
  SRB: "Serbia",
  SYC: "Seychelles",
  SLE: "Sierra Leone",
  SGP: "Singapore",
  SXM: "Sint Maarten (Dutch part)",
  SVK: "Slovakia",
  SVN: "Slovenia",
  SLB: "Solomon Islands",
  SOM: "Somalia",
  ZAF: "South Africa",
  SGS: "South Georgia and the South Sandwich Islands",
  SSD: "South Sudan",
  ESP: "Spain",
  LKA: "Sri Lanka",
  SDN: "Sudan (the)",
  SUR: "Suriname",
  SJM: "Svalbard and Jan Mayen",
  SWE: "Sweden",
  CHE: "Switzerland",
  SYR: "Syrian Arab Republic",
  TWN: "Taiwan",
  TJK: "Tajikistan",
  TZA: "Tanzania, United Republic of",
  THA: "Thailand",
  TLS: "Timor-Leste",
  TGO: "Togo",
  TKL: "Tokelau",
  TON: "Tonga",
  TTO: "Trinidad and Tobago",
  TUN: "Tunisia",
  TUR: "Turkey",
  TKM: "Turkmenistan",
  TCA: "Turks and Caicos Islands (the)",
  TUV: "Tuvalu",
  UGA: "Uganda",
  UKR: "Ukraine",
  ARE: "United Arab Emirates (the)",
  GBR: "United Kingdom of Great Britain and Northern Ireland (the)",
  UMI: "United States Minor Outlying Islands (the)",
  USA: "United States of America (the)",
  URY: "Uruguay",
  UZB: "Uzbekistan",
  VUT: "Vanuatu",
  VEN: "Venezuela (Bolivarian Republic of)",
  VNM: "Viet Nam",
  VGB: "Virgin Islands (British)",
  VIR: "Virgin Islands (U.S.)",
  WLF: "Wallis and Futuna",
  ESH: "Western Sahara",
  YEM: "Yemen",
  ZMB: "Zambia",
  ZWE: "Zimbabwe",
  ALA: "Åland Islands",
};
const sports = [
  "Baseball",
  "Basketball",
  "Cross Country",
  "Fencing",
  "Football",
  "Golf",
  "Gymnastics",
  "Ice Hockey",
  "Lacrosse",
  "Soccer",
  "Swimming and Diving",
  "Tennis",
  "Track and Field",
  "Volleyball",
  "Water Polo",
  "Wrestling",
  "Bowling",
  "Field Hockey",
  "Softball",
  "Other",
];
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
      return str;
    } else {
      throw `Error: Invalid phone number.`;
    }
  },

  checkLocation(location) {
    if (!location) throw `Error: You must supply a location!`;
    if (typeof location !== "string") throw `Error: Location must be a string!`;
    location = location.trim();
    if (location.length === 0)
      throw `Error: Location cannot be an empty string or string with just spaces`;
    if (!Object.values(countryListAlpha3).includes(location))
      throw "Error: Not a valid location.";
    return location;
  },
  checkSport(sport) {
    if (!sport) throw `Error: You must supply a sport!`;
    if (typeof sport !== "string") throw `Error: sSort must be a string!`;
    sport = sport.trim();
    if (sport.length === 0)
      throw `Error: Sport cannot be an empty string or string with just spaces`;
    if (!sports.includes(sport)) throw `Error: Not a valid sport.`;
    return sport;
  },
  checkLongText(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== "string") throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    if (strVal.length < 20 || strVal.length > 250) {
      throw `Error: ${varName} must be between 20 and 250 characters`;
    }
    return strVal;
  },
  checkDateString(date) {
    if (/^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(date)) {
      return date;
    }
    throw "Error: Date not in valid format";
  },
  checkBracketSize(num) {
    const validNums = [4, 8, 16, 32];
    num = parseInt(num);
    if (!validNums.includes(num))
      throw "Error: Not a valid number of teams for a tournament.";
    return num;
  },
};

export default exportedMethods;
