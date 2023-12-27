import * as jose from "jose";

export const generateAuthToken = async (payload) => {
  try {
    const alg = "HS256";
    const secretKey = new TextEncoder().encode(
      "12e39f06332deb2d591f9b72c143c07c8ada2f07f47a888640cbc6b178638429"
    );
    const jwt = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer("sandesh-vahak-backend")
      .setAudience("sandesh-vahak-frontend")
      .setExpirationTime("30d")
      .sign(secretKey);

    return jwt;
  } catch (e) {
    console.error("error in generating token ", e);
  }
};
