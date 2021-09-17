const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    twilio: {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      apiKey: process.env.TWILIO_API_KEY,
      apiSecret: process.env.TWILIO_API_SECRET,
      incomingAllow: process.env.TWILIO_ALLOW_INCOMING_CALLS === "true",
      callerId: process.env.FROM_NUMBER,
      outgoingApplicationSid: process.env.TWILIO_TWIML_APP_SID,
    }
}
  