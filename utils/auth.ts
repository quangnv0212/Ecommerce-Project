import { User } from "@/types/user.type";
import Cookies from "js-cookie";
export const LocalStorageEventTarget = new EventTarget();

export const setAccessTokenToLS = (access_token: string) => {
  Cookies.set("access_token", access_token);
};

export const setRefreshTokenToLS = (refresh_token: string) => {
  Cookies.set("refresh_token", refresh_token);
};

export const clearLS = () => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  Cookies.remove("profile");
  const clearLSEvent = new Event("clearLS");
  LocalStorageEventTarget.dispatchEvent(clearLSEvent);
};

export const getAccessTokenFromLS = () => Cookies.get("access_token") || "";

export const getRefreshTokenFromLS = () => Cookies.get("refresh_token") || "";

export const getProfileFromLS = () => {
  const result = Cookies.get("profile");
  return result ? JSON.parse(result) : null;
};

export const setProfileToLS = (profile: User) => {
  Cookies.set("profile", JSON.stringify(profile));
};
