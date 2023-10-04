const crypto = require('crypto');
const axios = require('axios');
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
var executionCount = 0;
const userSessions = {
  sessionID : {

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

// const recipientEmail = 'pavanrohitmi45@gmail.com'; 
// const senderEmail = '17ece187@gmail.com'; 
// const subject = 'Hello from SparkPost';
//  const text = 'This is a test email from SparkPost.';
//   const emailData = {
//      options: {
//       sandbox: false, // Set this to true for testing in SparkPost's sandbox environment    
//       },
//        content: {
//          from: senderEmail,
//          subject: subject,
//           text: text, },
//            recipients: [
//              { address: recipientEmail,
//               },], };
//                try {
//                  const response = await sparky.transmissions.send(emailData);
//                   console.log('Email sent successfully:', response);
//                    res.status(200).send('Email sent successfully'); 
//                    } catch (error) { console.error('Error sending email:', error);
//                     res.status(500).send('Error sending email');
//                      }

let session = req.body.sessionInfo.session;
session = session.split("/");
let last_session = session[session.length - 1];
if(!userSessions.sessionID[last_session]){
  userSessions.sessionID[last_session] = {};
}

  if (req.body.fulfillmentInfo.tag == 'Tpindtmf'){
    if (userSessions.sessionID[last_session]){
    let DTMF_Tpin = req.body.dtmfDigits;
    userSessions.sessionID[last_session].Tpin = DTMF_Tpin;
    // console.log("DTMF Tpin:::", DTMF_Tpin);
    DTMF_Tpin = DTMF_Tpin.split("");
    DTMF_Tpin = DTMF_Tpin.join(" ");
    //message = "Your T pin is " + DTMF_Tpin + " Yes or No";
    First_Name = req.body.sessionInfo.parameters.id;
    // userSessions.sessionID[last_session].User = First_Name;
    Tpin = req.body.sessionInfo.parameters.input.toString(); // Convert Tpin to string
    const key = 'key'; // Replace with your secret key
    const valueToHash = userSessions.sessionID[last_session].Tpin; // Replace with the value you want to hash
    const hashedValue = createHmacHash(key, Tpin);
    userSessions.sessionID[last_session].HashValue = hashedValue;
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
     password += getRandomChar(numbers);
     password += getRandomChar(smallLetters);
     password += getRandomChar(smallLetters);
     password += getRandomChar(smallLetters);
     password += getRandomChar(smallLetters);

  
     password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
  }


    if (hashedValue == 'baade98b1d01cf744d24025779ed20f635654eea7747febee798109b472ce22f' && userSessions.sessionID[last_session].UserName == 'Sai') {
      newPassword = generateRandomPassword();
      newPassword = newPassword.split("");
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
      message = userSessions.sessionID[last_session].UserName +' Twoje nowe hasło to' + Password_reset + ' ,,,, ,, Aby powtórzyć hasło, naciśnij 1 ,,,,, lub ,,,, jeśli chcesz zakończyć połączenie, naciśnij 2';
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
      message = userSessions.sessionID[last_session].UserName + '  Twoje nowe hasło to ' + Password_reset + ' ,,Aby powtórzyć hasło, naciśnij 1 ,,,,, lub ,,,, jeśli chcesz zakończyć połączenie, naciśnij 2';
    } else if (hashedValue == '7fccf8a7a023a1b67f9db1fe04f1f8c274c1553460d99cf899fd7a32e877faea' && userSessions.sessionID[last_session].UserName == 'Rahul') {
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
      message = userSessions.sessionID[last_session].UserName + '  Twoje nowe hasło to ' + Password_reset + ' ,,,, ,,Aby powtórzyć hasło, naciśnij 1 ,,,,, lub ,,,, jeśli chcesz zakończyć połączenie, naciśnij 2';
    } else if (hashedValue == '5ef6e142ba1e2f5876e0c0f83b071d0b243a3858b2e11cbb2c774aa0e78ec1cd' && userSessions.sessionID[last_session].UserName == 'Meghna') {
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
      message = userSessions.sessionID[last_session].UserName + ' Twoje nowe hasło to ' + Password_reset + ' ,,Aby powtórzyć hasło, naciśnij 1 ,,,,, lub ,,,, jeśli chcesz zakończyć połączenie, naciśnij 2';
    } else if (hashedValue == '7fccf8a7a023a1b67f9db1fe04f1f8c274c1553460d99cf899fd7a32e877faea' && userSessions.sessionID[last_session].UserName == 'Rahul') {
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
      message = userSessions.sessionID[last_session].UserName + ' your new password is ' + Password_reset + ' ,,,, ,,To repeat your password please Press 1,,,,  or ,,,,, if you want to end the call please Press 2'
     } else if (hashedValue == 5555 && First_Name == 'Ashfaq') {
      message = userSessions.sessionID[last_session].UserName + ' your new password is ' + Password_reset + ' ,,To repeat your password please say repeat, If you want to go back to the main menu say main menu, or , If you want support from a live agent then please say, Live Agent, if you want to end the call please say end or disconnect';
    } else if (hashedValue == 6464 && First_Name == 'Debaruna') {
      message = userSessions.sessionID[last_session].UserName + ' your new password is ' + Password_reset + ' ,,To repeat your password please say repeat, If you want to go back to the main menu say main menu, or , If you want support from a live agent then please say, Live Agent, if you want to end the call please say end or disconnect';
    } else if (hashedValue == 1234 && First_Name == 'Arijit') {
      message = userSessions.sessionID[last_session].UserName + ' your new password is ' + Password_reset + ' ,,To repeat your password please say repeat, If you want to go back to the main menu say main menu, or , If you want support from a live agent then please say, Live Agent, if you want to end the call please say end or disconnect';
    } else { 
      executionCount += 1;
      // for (let executionCount = 0; executionCount < 3; executionCount++) {
        if (executionCount < 3) {
        message = userSessions.sessionID[last_session].UserName + ' Spróbuj ponownie z prawidłowym Tpin lub Tpin powiązanym z Twoim profilem';
        a = 5;
        }   
        else {
        message = '';
        name= 1;
        executionCount = 0;
        }
      // }
    }
  }
}
  
  else if (req.body.fulfillmentInfo.tag == 'Sharp Sai') {
    if (userSessions.sessionID[last_session]){
        const emailData = `From Sai Pavan PVN. saipavanparamathmuni@gmail.com To Sai Pavan PVN 17ece187@gmail.com Date 6 Sep 2023, 7:05 pm See security details Dear Rahul, While use of the Dialogflow Trial Edition is available at no charge, there are limits on the amount of requests that you can make. For details, see Quotas & Limits. Each request is rounded up to the nearest increment of 15 seconds. Thanks Sai Pavan`;

        const parsedEmail = await mailparser.simpleParser(emailData);
        console.log('Parsed Email: ', parsedEmail);
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
      message = "An error occurred while generating access token ";
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
      message = 'Czy mówię do ' + response.data.value[0].displayName + ', Jeśli tak, potwierdź naciskając 1, Jeśli nie, naciśnij 2, aby ponownie wprowadzić Pracownik I D';
      Azure_AD = "Correct";
      console.log("Checking Email Format:::", userSessions);
      }else{
        Azure_AD = "Incorrect";
        message = 'Proszę podać poprawnego pracownika I D';
        // console.log("User Details::::", req.body);
        console.log("Checking Email Format:::", userSessions);
      } 
} catch (error) {
      console.error(error);
      message = "An error occurred while fetching user info from Azure AD ";
    }


  }
}else if (req.body.intentInfo.displayName == 'Usershortdescription') {
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
     const specialChars = '@#%_';
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
      message = First_Name +' Twoje nowe hasło to ' + Password_reset + ' ,,Aby powtórzyć hasło, powiedz powtórz, Jeśli chcesz wrócić do menu głównego, powiedz menu główne, lub , Jeśli chcesz uzyskać wsparcie od agenta na żywo, powiedz Live Agent, jeśli chcesz zakończyć połączenie, powiedz zakończ lub rozłącz';
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
      }
    },
  };
  res.status(200).send(jsonResponse);
  Password_reset = "";
  name = "";
  a = "";
  Azure_AD = "";
};
