import {Axios} from "axios";

export async function logoutUser(privateAxiosInstance: Axios) {
  await privateAxiosInstance.post("/auth/logout");
}
