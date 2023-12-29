import * as jose from "jose";

export const verifyAuthToken = async (authToken) => {
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);

  const { payload } = await jose.jwtVerify(authToken, secret, {
    issuer: "convo-connect-backend",
    audience: "convo-connect-frontend",
  });

  return payload.userId;
};
