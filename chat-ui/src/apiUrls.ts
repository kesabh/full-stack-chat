const baseUrl = "http://localhost:5000";

export const apiUrls: { [index: string]: string } = {
  USER_LOGIN: `${baseUrl}/auth/login`,
  USER_REGISTER: `${baseUrl}/auth/register`,
  UPLOAD_PROFILE_PICTURE: "https://api.cloudinary.com/v1_1/dzmtfzd14/upload",
  SEARCH_USERS: `${baseUrl}/users`,
  FETCH_ALL_CHATS: `${baseUrl}/chat`,
  CREATE_NEW_CHAT: `${baseUrl}/chat/create`,
  SEND_MESSAGE: `${baseUrl}/message`,
  GET_MESSAGES: `${baseUrl}/message`,
  CREATE_GROUP_CHAT: `${baseUrl}/group/`,
  UPDATE_GROUP_CHAT: `${baseUrl}/group/`,
};
