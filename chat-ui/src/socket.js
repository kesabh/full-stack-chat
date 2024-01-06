import { io } from "socket.io-client";
import { baseUrl } from "./apiUrls";

export const socket = io(baseUrl, { autoConnect: false });
