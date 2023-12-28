const baseUrl = "http://localhost:5000";

export const apiUrls: { [index: string]: string } = {
  USER_LOGIN: `${baseUrl}/auth/login`,
  USER_REGISTER: `${baseUrl}/auth/register`,
  UPLOAD_PROFILE_PICTURE: "https://api.cloudinary.com/v1_1/dzmtfzd14/upload",
};
