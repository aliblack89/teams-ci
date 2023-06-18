import config from "../../sample/lib/config";
import {
  BearerTokenAuthProvider,
  createApiClient,
  TeamsUserCredential,
} from "@microsoft/teamsfx";

const credentials = new TeamsUserCredential(config);
async function getAccessToken() {
  const token = await credentials.getToken(
    "api://8877ebd4-0160-4d5c-9ed6-e75500ba3c01/Spike.Read"
  );

  return token;
}

export const client = createApiClient(
  "https://localhost:1234",
  new BearerTokenAuthProvider(async () => {
    const accessToken = await credentials.getToken(
      "api://8877ebd4-0160-4d5c-9ed6-e75500ba3c01/Spike.Read"
    );
    if (accessToken && accessToken.token) {
      return accessToken.token;
    }
    return "";
  })
);
