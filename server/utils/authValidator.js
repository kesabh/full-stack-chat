import { verifyAuthToken } from "./verifyAuthToken.js";
/* *
middleware for validating the authtoken coming in the header from client side
*/

export const authValidator = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    if (req.headers.authorization.startsWith("Bearer")) {
      try {
        const authToken = req.headers.authorization.slice(7);

        const userId = await verifyAuthToken(authToken);
        if (userId) {
          req.userId = userId;
        }
        next();
      } catch (e) {
        console.error("error while verifying auth token", e);
        res.status(401).send({ message: "invalid authorization token " });
      }
    } else {
      console.error("invalid authorization token ");
      res.status(401).send({ message: "invalid authorization token " });
      return;
    }
  } else {
    console.error("authorization header missing");
    res.status(401).send({ message: "authorization header missing" });
    return;
  }
};
