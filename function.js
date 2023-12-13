const crypto = require('crypto');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const axios = require('axios');
const nodemailer = require('nodemailer');
const qs = require('qs');
const mailparser = require('mailparser');
const SparkPost = require('sparkpost');
const sparky = new SparkPost('d36f6b34fe908789f6d0ae0b9bedcf7c97307e84');
var incident_Number = '';
var First_Name = '';
var shortdescription = '';
var description = '';
var Valid_Tpin = '';
var newPassword = '';
var new_Password = '';
var Tpininput = '';
var incidentNumber = '';
var incident_Number = "";
var Password_reset = "";
var Password_parameter = "";
var Tpin = "";
var name = "";
var a ="";
var Azure_AD = "";
var access_token = "";
var executionCount = 0;
var data1 = "";
var data2 = "";
var call_count = 0;
var ten_minute_count = 0;
var incorrectTpinCount = 0;
var correctTpinCount = 0;
var Newpassword = "";
var empidincorrect = "";
var wrongempid = "";
var w4= 1;
const secrets = [];
const userSessions = {
  sessionID : {

  }
};

const tpinBlock = {
  session : {

  }
};
const usersession ={
  sess : {

  }
};
const daily_object = {
  unique : {

  }
};

function isEmmailFormat(text){
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(text);
}

 function createHmacHash(key, value) {
   const hmac = crypto.createHmac('sha256', key);  
    hmac.update(value);
   return hmac.digest('hex');
 }

exports.helloWorld = async (req, res) => {

  let session = req.body.sessionInfo.session;
session = session.split("/");
let last_session = session[session.length - 1];
if(!userSessions.sessionID[last_session]){
  userSessions.sessionID[last_session] = {empidincorrect : 0, secrets : []};
}


  try {
    const client = new SecretManagerServiceClient();
    // Replace these with your actual secret names
    const secretNames = [
      'projects/elegant-zodiac-379405/secrets/Employee/versions/latest',
      'projects/elegant-zodiac-379405/secrets/SecondName/versions/latest',
      'projects/elegant-zodiac-379405/secrets/AzureServiceAccountUserName/versions/latest',
      'projects/elegant-zodiac-379405/secrets/AzureClientId/versions/latest',
      'projects/elegant-zodiac-379405/secrets/AzureClientSecret/versions/latest',
      'projects/elegant-zodiac-379405/secrets/AzureTenantId/versions/latest'

      // Add more secret names as needed
    ];
 
    // const secrets = [];
 
    for (const name of secretNames) {
      const [version] = await client.accessSecretVersion({ name });
      const secretValue = version.payload.data.toString('utf8');
      userSessions.sessionID[last_session].secrets.push({ name, value: secretValue });
    }
 
    console.log('Secrets:', secrets);
    //console.log('Secret value Tenant Id:::', ${userSessions.sessionID[last_session].secrets[5].value}) // Print the secrets to logs
    // res.status(200).json({ secrets });
  } catch (error) {
    console.error(`Error accessing secrets: ${error}`);
    // res.status(500).send('Error accessing secrets.');
  }

  





async function updateUserPassword() {
  const getAccessToken = async () => {
    let data = qs.stringify({
      'client_id': `${userSessions.sessionID[last_session].secrets[3].value}`,
      'client_secret': `${userSessions.sessionID[last_session].secrets[4].value}`,
      'scope': 'https://graph.microsoft.com/.default',
      'grant_type': 'password',
      'username': `${userSessions.sessionID[last_session].secrets[2].value}`,
      'password': `${userSessions.sessionID[last_session].secrets[0].value}`
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://login.microsoftonline.com/${userSessions.sessionID[last_session].secrets[5].value}/oauth2/v2.0/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };

    try {
      const response = await axios(config);
      const accessToken = response.data.access_token;
      console.log('Generated Token:', accessToken);
      return accessToken;
    } catch (error) {
      console.error('Error getting access token:', error.response ? error.response.data : error.message);
      throw error;
    }
  };

  // const accessToken = await getAccessToken();

  async function updateUserPasswordInternal(accessToken) {
    let response = null; // Initialize response variable here

    const resetPasswordUrl = `https://graph.microsoft.com/v1.0/users/${userSessions.sessionID[last_session].UPN}/authentication/methods/28c10230-6103-485e-b985-444c60001490/resetPassword`;

    // New password to set
    const newPassword = Newpassword;
    console.log('New Password updated successfully:', newPassword);
    const resetPasswordData = {
      'newPassword': newPassword
    };

    const resetPasswordConfig = {
      method: 'post',
      url: resetPasswordUrl,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      data: resetPasswordData
    };

    try {
      response = await axios(resetPasswordConfig);
      console.log('Password updated successfully:', response.data);
    } catch (error) {
      console.log("password::::", newPassword);

      // Check if response is defined before accessing its properties
      if (response && response.data && response.data.value && response.data.value[0]) {
        console.log('upn::', response.data.value[0].userPrincipalName);
      }

      console.error('Error updating password:', error.response ? error.response.data : error.message);
    }
  }

  // Call the internal function to update the user's password
  const accessToken = await getAccessToken();
  await updateUserPasswordInternal(accessToken);
}

// Call the main function



// Call the function whenever you want to execute the code



  if(req.body.message == 'ten_minutes'){
    if(ten_minute_count >= 2){
      let ten_minute_percentage = (ten_minute_count/call_count)*100;
        let userDetails = Object.values(tpinBlock.session);
        // console.log("Value details::::", userDetails);
        for (let i = 0; i<userDetails.length; i++){
          data1 += i+1 + '. ' + Object.values(userDetails[i]) + '\n';
        }
        let mailTransporter = nodemailer.createTransport({

 service: 'gmail',
 auth: {
 user: '17ece187@gmail.com',
 pass: 'hnmxlcxafdqhnwlk'
 }
});
  console.log(`Total call received ${call_count} and total tpin bolck ${ten_minute_count}`);
  console.log('User Details:::', data1);
let mailDetails = {
 from: 'Bot, 17ece187@gmail.com',
 to: 'saipavanparamathmuni@gmail.com',
 subject: 'Security mail from cloud scheduler ten minutes',
 text: `From 10 minutes scheduler I have verified that, this many TPIN status is blocked count: ${ten_minute_count} out of ${call_count}, nearly ${ten_minute_percentage} % are getting TPIN blocked.\n` + data1,
};
mailTransporter.sendMail(mailDetails, function(err, data) {
 if(err) {
 console.log('Error Occurs ', err);
 res.status(500).send("Error while doing this work");
 } else {
 console.log('Email sent successfully ');
 res.status(200).send("Email is sent successfully");

 }
      })
      ten_minute_count = 0;
      incorrectTpinCount = 0;
      tpinBlock.session = {};
      data1 = '';
      res.status(200).send('Triggering successfully');
      // res.end("Finished");
    }
    else{
  console.log("Trigger from cloud scheduler in else part ", req.body.message);
  res.status(200).send("Success");
  // res.end("Finished");
  // console.log("Request:::", req.body);
    }
  }
  else if(req.body.message == 'every_night'){
    // console.log("Every Night::::", Object.values(daily_object.unique));
    // if(call_count >= 10 || incorrectTpinCount >= 5){
        let daily_percentage = (incorrectTpinCount/call_count)*100;
        let total_percentage = (correctTpinCount/call_count)*100;
        let userDetail = Object.values(daily_object.unique);
        // console.log("Value details::::", userDetail);
        for (let i = 0; i<userDetail.length; i++){
          data2 += i+1 + '. ' + Object.values(userDetail[i]) + '\n';
        }
        // console.log("DATA 1::::", data1);
        // message += "\n" + "Triggering the alert mail or creating major incident";
        // console.log("Tpin blocked status count reach to threshold ", incorrectTpinCount);
        let mailTransporter = nodemailer.createTransport({

 service: 'gmail',
 auth: {
 user: '17ece187@gmail.com',
 pass: 'hnmxlcxafdqhnwlk'
 }
});
let mailDetails = {
 from: 'Bot, 17ece187@gmail.com',
 to: 'saipavanparamathmuni@gmail.com',
 subject: 'Security mail from cloud scheduler daily',
 text: `From daily scheduler I have verified that, this many TPIN status is blocked count: ${incorrectTpinCount} out of ${call_count}, nearly ${daily_percentage} % are getting TPIN blocked. And total percentage of count is ${total_percentage} % where correct TPIN status is ${correctTpinCount} out of ${call_count} \n\n\n\n` + data2,
};
mailTransporter.sendMail(mailDetails, function(err, data) {
 if(err) {
 console.log('Error Occurs ', err);
 res.status(500).send("Error while doing this work");
 } else {
 console.log('Email sent successfully ');
 res.status(200).send("Email is sent successfully");

 }
      })
      incorrectTpinCount = 0;
      correctTpinCount = 0;
      daily_object.unique = {};
      data2 = '';
  res.status(200).send('Triggering successfully by 2 scheduler');
  // res.end("Finished");
  // }
  // else{
  //   console.log("From else part of scheduler 2");
  //   incorrectTpinCount = 0;
  //     daily_object.unique = {};
  //     data2 = '';
  //   res.status(200).send('Triggering successfully by 2 scheduler');
  //   // res.end("Finished");
  // }
  }

  



// let session = req.body.sessionInfo.session;
// session = session.split("/");
// let last_session = session[session.length - 1];
// if(!userSessions.sessionID[last_session]){
//   userSessions.sessionID[last_session] = {empidincorrect : 0, secrets : []};
// }

  if (req.body.fulfillmentInfo.tag == 'Tpindtmf'){
    if (userSessions.sessionID[last_session]){
    let DTMF_Tpin = req.body.dtmfDigits;
    // userSessions.sessionID[last_session].Tpin = DTMF_Tpin;
    // console.log("DTMF Tpin:::", DTMF_Tpin);
    DTMF_Tpin = DTMF_Tpin.split("");
    DTMF_Tpin = DTMF_Tpin.join(" ");
    //message = "Your T pin is " + DTMF_Tpin + " Yes or No";
    // First_Name = req.body.sessionInfo.parameters.id;
    // userSessions.sessionID[last_session].UserID = First_Name;
    Tpin = req.body.sessionInfo.parameters.input.toString(); // Convert Tpin to string
    const key = 'key'; // Replace with your secret key
    // const valueToHash = userSessions.sessionID[last_session].Tpin; // Replace with the value you want to hash
    const hashedValue = createHmacHash(key, Tpin);
    console.log("Hased value::::::", hashedValue);
    // userSessions.sessionID[last_session].HashValue = hashedValue;
    console.log("Details:::", userSessions);

    function generateRandomPassword() {
     const specialChars = '@#%_*';
     const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
     const numbers = '0123456789';
     const smallLetters = 'abcdefghijklmnopqrstuvwxyz';

     const getRandomChar = (charSet) => charSet[Math.floor(Math.random() * charSet.length)];

     let password = '';
     password += getRandomChar(specialChars);
     password += getRandomChar(capitalLetters);
     password += getRandomChar(numbers);
     password += getRandomChar(smallLetters);
     password += getRandomChar(smallLetters);
     password += getRandomChar(smallLetters);
     password += getRandomChar(smallLetters);
     password += getRandomChar(smallLetters);

  
     password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
  }


    if (hashedValue == '16934af602cbf01f8980e88ceda41f315247dea5875060c89707d61d2c76b6be' && userSessions.sessionID[last_session].UserName == 'Sai') {
      Newpassword = generateRandomPassword();
      console.log('New Password :', Newpassword);
      newPassword = Newpassword.split("");
      new_Password = newPassword;
      newPassword = newPassword.join(" .,");
      for (let i=0; i< new_Password.length; i++){
      if(/[A-Z]/.test(new_Password[i])){
      Password_reset += " .,Capital., " + new_Password[i] + " .,";
      }
    else{
      Password_reset += new_Password[i] + " .,"
  }
}
      updateUserPassword();
      console.log("Password successful::::", userSessions.sessionID[last_session].UserName);
      message =  'Your Tpin is verified. Pay close attention, as i will now spell out your password. your password is, '+ Password_reset + 'Press 1 to Reiterate the password again or hang up now.';

    } else if (hashedValue == 'gyufdfydryrdrfccgtdrses565e5d' && userSessions.sessionID[last_session].UserName == 'Abhinav') {
      newPassword = generateRandomPassword();
      newPassword = newPassword.split("");
      new_Password = newPassword;
      newPassword = newPassword.join(" ,,,,,, ");
      for (let i=0; i< new_Password.length; i++){
      if(/[A-Z]/.test(new_Password[i])){
      Password_reset += " Capital " + new_Password[i] + " ,,,,,, ";
      }
    else{
      Password_reset += new_Password[i] + " ,,,,,, "
  }
}
      message =  'Your T PIN is verified. Pay close attention, as i will now spell out your password. your password is'+ Password_reset + 'Press 1 to Reiterate the password again or hang up now.';
    } else if (hashedValue == '4c91359fdad83da13fff40eb7021d2809bb78c9b394235d955bf27821de29d0d' && userSessions.sessionID[last_session].UserName == 'Rahul') {
      Newpassword = generateRandomPassword();
      console.log('New Password :', Newpassword);
      newPassword = Newpassword.split("");
      new_Password = newPassword;
      newPassword = newPassword.join(" ,,,,,, ");
      for (let i=0; i< new_Password.length; i++){
      if(/[A-Z]/.test(new_Password[i])){
      Password_reset += " Capital " + new_Password[i] + " ,,,,,, ";
      }
    else{
      Password_reset += new_Password[i] + " ,,,,,, "
  }
}     updateUserPassword();
      message = 'Your T PIN is verified. Pay close attention, as i will now spell out your password. your password is, '+ Password_reset + 'Press 1 to Reiterate the password again or hang up now.';
    } else if (hashedValue == 'def729dbcc1bf3ca34dff048beaa362d6c149fd0d60b9cf1de912b68283fdb3c' && userSessions.sessionID[last_session].UserName == 'Meghna') {
      Newpassword = generateRandomPassword();
      newPassword = Newpassword.split("");
      new_Password = newPassword;
      newPassword = newPassword.join(" ,,,,,, ");
      for (let i=0; i< new_Password.length; i++){
      if(/[A-Z]/.test(new_Password[i])){
      Password_reset += " Capital " + new_Password[i] + " ,,,,,, ";
      }
    else{
      Password_reset += new_Password[i] + " ,,,,,, "
  }
}     updateUserPassword();
      message = 'Your T PIN is verified. Pay close attention, as i will now spell out your password. your password is, '+ Password_reset + 'Press 1 to Reiterate the password again or hang up now.';
    } else if (hashedValue == '4c91359fdad83da13fff40eb7021d2809bb78c9b394235d955bf27821de29d0d' && userSessions.sessionID[last_session].UserName == 'Rahul') {
      Newpassword = generateRandomPassword();
      newPassword = Newpassword.split("");
      new_Password = newPassword;
      newPassword = newPassword.join(" ,,,,,, ");
      for (let i=0; i< new_Password.length; i++){
      if(/[A-Z]/.test(new_Password[i])){
      Password_reset += " Capital " + new_Password[i] + " ,,,,,, ";
      }
    else{
      Password_reset += new_Password[i] + " ,,,,,, "
  }
}     updateUserPassword();
      message = 'Your T PIN is verified. Pay close attention, as i will now spell out your password. your password is, '+ Password_reset + 'Press 1 to Reiterate the password again or hang up now.';
     } else if (hashedValue == 5555 && First_Name == 'Ashfaq') {
      message = userSessions.sessionID[last_session].UserName + ' your new password is ' + Password_reset + ' ,,To repeat your password please say repeat, If you want to go back to the main menu say main menu, or , If you want support from a live agent then please say, Live Agent, if you want to end the call please say end or disconnect';
    } else if (hashedValue == 6464 && First_Name == 'Debaruna') {
      message = userSessions.sessionID[last_session].UserName + ' your new password is ' + Password_reset + ' ,,To repeat your password please say repeat, If you want to go back to the main menu say main menu, or , If you want support from a live agent then please say, Live Agent, if you want to end the call please say end or disconnect';
    } else if (hashedValue == 1234 && First_Name == 'Arijit') {
      message = userSessions.sessionID[last_session].UserName + ' your new password is ' + Password_reset + ' ,,To repeat your password please say repeat, If you want to go back to the main menu say main menu, or , If you want support from a live agent then please say, Live Agent, if you want to end the call please say end or disconnect';
    } else { 
      // console.log("Inside else block");
      executionCount = 1;
      // for (let executionCount = 0; executionCount < 3; executionCount++) {
        if (executionCount > 3) {
        message = userSessions.sessionID[last_session].UserName + ' Please try again with a valid Tpin or Tpin which is associated with your profile';
        a = 5;
        }   
        else {
          // console.log("Inside else of else block");
        message = 'Your TPIN is blocked, please reach out to live agent for further assisstance ....disconnecting the call..';
        if(!tpinBlock.session[last_session]){
          tpinBlock.session[last_session] = {};
        }
        tpinBlock.session[last_session].userID = userSessions.sessionID[last_session].UserID;
        tpinBlock.session[last_session].user = userSessions.sessionID[last_session].UserName;
        tpinBlock.session[last_session].date = new Date();
        ten_minute_count += 1;
        // console.log("Tpin Block:::", tpinBlock);
        name= 1;
        executionCount = 0;
        incorrectTpinCount += 1;
        name= 1;
        executionCount = 0;
        }
      // }
    }
  }
}


  
  else if (req.body.fulfillmentInfo.tag == 'Sharp Sai') {
    if (userSessions.sessionID[last_session]){
        // const emailData = `From Sai Pavan PVN. saipavanparamathmuni@gmail.com To Sai Pavan PVN 17ece187@gmail.com Date 6 Sep 2023, 7:05 pm See security details Dear Rahul, While use of the Dialogflow Trial Edition is available at no charge, there are limits on the amount of requests that you can make. For details, see Quotas & Limits. Each request is rounded up to the nearest increment of 15 seconds. Thanks Sai Pavan`;

        // const parsedEmail = await mailparser.simpleParser(emailData);
        // console.log('Parsed Email: ', parsedEmail);
    First_Name = req.body.dtmfDigits;
    userSessions.sessionID[last_session].UserID = First_Name;

  let data = qs.stringify({
  'client_id': `${userSessions.sessionID[last_session].secrets[3].value}`,
  'client_secret': `${userSessions.sessionID[last_session].secrets[4].value}`,
  'scope': 'https://graph.microsoft.com/.default',
  'grant_type': 'client_credentials' 
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: `https://login.microsoftonline.com/${userSessions.sessionID[last_session].secrets[5].value}/oauth2/v2.0/token`,
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

try {
      const response = await axios.request(config);
      if(response.statusText == 'OK'){
        console.log("Getting the access token here:::", response.data.access_token);
        userSessions.sessionID[last_session].access_token = response.data.access_token
        access_token = response.data.access_token;
      }
} catch (error) {
      console.error(error);
      message = "An error occurred while generating access token ";
    }

    let config1 = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `https://graph.microsoft.com/beta/users?$filter=employeeID eq \'${userSessions.sessionID[last_session].UserID}'&$count=true`,
  headers: { 
    'Authorization': `Bearer ${access_token}`
  }
};

try {
      const response = await axios.request(config1);
      if(response.data.value[0] != null){
      console.log("User Details::::", response.data);
      userSessions.sessionID[last_session].UPN = response.data.value[0].userPrincipalName; 
      userSessions.sessionID[last_session].UserName = response.data.value[0].givenName;
      message = 'Am I speaking to ' + response.data.value[0].displayName + ', Please Press 1 to confirm, Press 2 to Re-enter the employee i d';
// message = "From cloud function" ; 
Azure_AD = "Correct";
      call_count += 1;
      // console.log("Checking Email Format:::", userSessions);
      }else{
        Azure_AD = "Incorrect";

        userSessions.sessionID[last_session].empidincorrect += 1;
        message = 'The provided employee ID is not valid. Please re enter the Employee I D.';
        // console.log("User Details::::", req.body);
        console.log("empid count ::::", userSessions);
        //w4 +=1;
        if(userSessions.sessionID[last_session].empidincorrect > 2){
          userSessions.sessionID[last_session].wrongempid = 1;
          message="";
          //console.log("in if");
        }
      } 
} catch (error) {
      console.error(error);
      message = "An error occurred while fetching user info from Azure AD ";
    }


  }
}


else if (req.body.fulfillmentInfo.tag == 'French Sharp Sai') {
    if (userSessions.sessionID[last_session]){
    First_Name = req.body.dtmfDigits;
    userSessions.sessionID[last_session].UserID = First_Name;

  let data = qs.stringify({
  'client_id': 'ea563f3e-264b-419d-8e8b-57775a560d5b',
  'client_secret': 'jO68Q~rl5b5f6jytdZCRjpvMc8PLYzROCoZCDbl4',
  'scope': 'https://graph.microsoft.com/.default',
  'grant_type': 'client_credentials' 
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://login.microsoftonline.com/a2670829-af5d-4985-a7ef-5c0d89af27c6/oauth2/v2.0/token',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

try {
      const response = await axios.request(config);
      if(response.statusText == 'OK'){
        // console.log("Getting the access token here:::", response.data.access_token);
        userSessions.sessionID[last_session].access_token = response.data.access_token
      }
} catch (error) {
      console.error(error);
      message = "Une erreur s’est produite lors de la génération du jeton d’accès ";
    }

    let config1 = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `https://graph.microsoft.com/beta/users?$filter=employeeID eq \'${userSessions.sessionID[last_session].UserID}'&$count=true`,
  headers: { 
    'Authorization': `Bearer ${userSessions.sessionID[last_session].access_token}`
  }
};

try {
      const response = await axios.request(config1);
      if(response.data.value[0] != null){
      // console.log("User Details::::", response.data);
      userSessions.sessionID[last_session].UserName = response.data.value[0].givenName;
      message = 'Est-ce que je parle à ' + response.data.value[0].userPrincipalName + ', Si c’est le cas, veuillez confirmer en appuyant sur 1, sinon appuyez sur 2 pour entrer à nouveau votre employé I D';
      console.log("From French BOT");
      Azure_AD = "Correct";
      // console.log("Azure AD:::", userSessions);
      }else{
        Azure_AD = "Incorrect";
        message = 'Veuillez fournir le bon employé I D';
        // console.log("User Details::::", req.body);
      } 
} catch (error) {
      console.error(error);
      message = "An error occurred while fetching user info from Azure AD ";
    }


  }
}




else if (req.body.intentInfo.displayName == 'Usershortdescription') {
    shortdescription = req.body.text || req.body.transcript;
    message = 'Your short description is. ' + shortdescription + ' .If so please say Yes. If not please say No';
  } else if (req.body.intentInfo.displayName == 'Userlongdescription') {
    description = req.body.text || req.body.transcript;
    message = 'Your long description is. ' + description + ' .If so please say Yes. If not please say No';
  } else if (req.body.intentInfo.displayName == 'description.yes') {
    let data = JSON.stringify({
      "short_description": shortdescription,
      "description": description,
      "contact_type": "Virtual Agent",
      "caller_id": "bisht.rahul2@tcs.com"
    });

    let config = {
      method: 'post',
      url: 'https://dev97214.service-now.com/api/now/v1/table/incident',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46ZkdXQm9rS3BhNVc5'
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      message = 'We have created a ticket for you and your ticket number is, ' + response.data.result.number + ' ,the short description of your ticket is, ' + response.data.result.short_description + ' , and the long description of your issue is , ' + response.data.result.description + ' , we will be working on solving your issue at the earliest!, To return to the main menu please say Main menu or If you want support from a live agent then please say, Live Agent, if you want to end the call please say end or disconnect';
    } catch (error) {
      console.error(error);
      message = "An error occurred while creating the ticket ";
    }
  }
 // else if (req.body.intentInfo.displayName == 'IncidentNumber') {
  //   let text = req.body.text || req.body.transcript;
  //   incidentNumber = text.replace(/[^0-9]/g, "");
  //   incident_Number = "INC" + incidentNumber;
  //   incidentNumber = incidentNumber.split("");
  //   incidentNumber = incidentNumber.join(" ");
  //   incidentNumber = "I N C " + incidentNumber;
  //   message = 'Your Incident Number is ' + incidentNumber + ' If so please say Yes, if not please say No'; }
  
  else if (req.body.intentInfo.displayName == 'Tpininput') {
    console.log("Tpin value :::::", req.body);
    Tpin_Input = req.body.transcript || req.body.text;
    Valid_Tpin = Tpin_Input.replace(/[^0-9]/g, "");
    let split_Tpin = Valid_Tpin.split("");
    let join_Tpin = split_Tpin.join(" ");
    message = 'Your Tpin is ' + join_Tpin + ' Yess or No';
  }
  else if (req.body.intentInfo.displayName == 'Normal.yes') {
  First_Name = req.body.sessionInfo.parameters.userid;
  Tpin = req.body.sessionInfo.parameters.input.toString(); // Convert Tpin to string
  const key = 'key'; // Replace with your secret key
  const valueToHash = Tpin; // Replace with the value you want to hash
  const hashedValue = createHmacHash(key, Tpin);
  console.log("Hash Value:::", hashedValue);

    function generateRandomPassword() {
     const specialChars = '@#$%&_';
     const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
     const numbers = '0123456789';
     const smallLetters = 'abcdefghijklmnopqrstuvwxyz';

     const getRandomChar = (charSet) => charSet[Math.floor(Math.random() * charSet.length)];

     let password = '';
     password += getRandomChar(specialChars);
     password += getRandomChar(capitalLetters);
     password += getRandomChar(numbers);
     password += getRandomChar(numbers);
     password += getRandomChar(smallLetters);
     password += getRandomChar(smallLetters);
     password += getRandomChar(smallLetters);
     password += getRandomChar(smallLetters);

  
     password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
}

newPassword = generateRandomPassword();

newPassword = newPassword.split("");

new_Password = newPassword;

newPassword = newPassword.join(" ,,,,,, ");

for (let i=0; i< new_Password.length; i++){

   if(/[A-Z]/.test(new_Password[i])){

    Password_reset += " Capital " + new_Password[i] + " ,,,,,, ";

  }

  else{

    Password_reset += new_Password[i] + " ,,,,,, "

  }
   }
    if (hashedValue == 'baade98b1d01cf744d24025779ed20f635654eea7747febee798109b472ce22f' && First_Name == 'Sai') {
      message = First_Name +' your new password is ' + Password_reset + ' ,,To repeat your password please say repeat, If you want to go back to the main menu say main menu, or , If you want support from a live agent then please say, Live Agent, if you want to end the call please say end or disconnect';
    } else if (hashedValue == 'gyufdfydryrdrfccgtdrses565e5d' && First_Name == 'Abhinav') {
      message = First_Name + ' your new password is ' + Password_reset + ' ,,To repeat your password please say repeat, If you want to go back to the main menu say main menu, or , If you want support from a live agent then please say, Live Agent, if you want to end the call please say end or disconnect';
    } else if (hashedValue == '7fccf8a7a023a1b67f9db1fe04f1f8c274c1553460d99cf899fd7a32e877faea' && First_Name == 'Rahul') {
      message = First_Name + ' your new password is ' + Password_reset + ' ,,To repeat your password please say repeat, If you want to go back to the main menu say main menu, or , If you want support from a live agent then please say, Live Agent, if you want to end the call please say end or disconnect';
    } else if (hashedValue == 4444 && First_Name == 'Meghna') {
      message = First_Name + ' your new password is ' + Password_reset + ' ,,To repeat your password please say repeat, If you want to go back to the main menu say main menu, or , If you want support from a live agent then please say, Live Agent, if you want to end the call please say end or disconnect';
    } else if (hashedValue == 5555 && First_Name == 'Ashfaq') {
      message = First_Name + ' your new password is ' + Password_reset + ' ,,To repeat your password please say repeat, If you want to go back to the main menu say main menu, or , If you want support from a live agent then please say, Live Agent, if you want to end the call please say end or disconnect';
    } else if (hashedValue == 6464 && First_Name == 'Debaruna') {
      message = First_Name + ' your new password is ' + Password_reset + ' ,,To repeat your password please say repeat, If you want to go back to the main menu say main menu, or , If you want support from a live agent then please say, Live Agent, if you want to end the call please say end or disconnect';
    } else if (hashedValue == 1234 && First_Name == 'Arijit') {
      message = First_Name + ' your new password is ' + Password_reset + ' ,,To repeat your password please say repeat, If you want to go back to the main menu say main menu, or , If you want support from a live agent then please say, Live Agent, if you want to end the call please say end or disconnect';
    } else {
      message = First_Name + ' Please try again with a valid Tpin or Tpin which is associated with your profile please';
    }
  }



  const jsonResponse = {
    fulfillment_response: {
      messages: [{
        text: {
          text: [message],
        },
      }, ],
    },
    session_info: {
      parameters: {
        value1: Password_reset,
        value3: name,
        count: a,
        Azure_MSG : Azure_AD,
        Name : userSessions.sessionID[last_session].UserName,
        empid: userSessions.sessionID[last_session].wrongempid
      }
    },
  };
  res.status(200).send(jsonResponse);
  Password_reset = "";
  name = "";
  a = "";
  Azure_AD = "";
};
