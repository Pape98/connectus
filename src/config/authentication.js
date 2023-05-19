import { ROUTES } from "../constants";

export const msalConfig = {
  auth: {
    clientId: "a52fb57f-0689-4482-8cf9-4f93e6683523", // client ID of application on Azure
    authority:
      "https://login.microsoftonline.com/engineeringconnectus.onmicrosoft.com",
    redirectUri: ROUTES.CLIENT.LOADING,
    postLogoutRedirectUri: ROUTES.CLIENT.LOGIN, // Indicates the page to navigate after logout.
    navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"],
  prompt: "select_account",
};

export const logoutRequest = {
  mainWindowRedirectUri: ROUTES.CLIENT.LOGIN,
};
