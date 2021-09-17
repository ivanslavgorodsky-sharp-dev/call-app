const twilio = require("twilio");
const AccessToken = twilio.jwt.AccessToken;
const { VoiceGrant } = AccessToken;

const generateToken = config => {
  return new AccessToken(
    config.twilio.accountSid,
    config.twilio.apiKey,
    config.twilio.apiSecret
  );
};

const voiceToken = (identity, config) => {
    var voiceGrant = new VoiceGrant({
        outgoingApplicationSid: config.twilio.outgoingApplicationSid,
        incomingAllow: false,
    });

    const token = generateToken(config);
    token.addGrant(voiceGrant);
    token.identity = identity;
    return token;
};

module.exports = { voiceToken };
