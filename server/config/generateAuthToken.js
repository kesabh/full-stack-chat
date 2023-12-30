import * as jose from "jose";

export const generateAuthToken = async (payload) => {
  try {
    const alg = "HS256";
    const secretKey = new TextEncoder().encode(process.env.SECRET_KEY);
    console.log(process.env.SECRET_KEY);
    const jwt = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer("convo-connect-backend")
      .setAudience("convo-connect-frontend")
      .setExpirationTime("7d")
      .sign(secretKey);

    return jwt;
  } catch (e) {
    console.error("error in generating token ", e);
  }
};
