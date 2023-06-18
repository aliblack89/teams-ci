import { AxiosRequestConfig } from "axios";
import authConfig from "../../sample/lib/config";
import {
  BearerTokenAuthProvider,
  TeamsUserCredential,
  createApiClient,
} from "@microsoft/teamsfx";

export async function fetcher<T>(config: AxiosRequestConfig): Promise<T> {
  const credentials = new TeamsUserCredential(authConfig);

  const apiClient = createApiClient(
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

  try {
    const response = await apiClient("saf", config);
    return response.data;
  } catch (error) {
    throw error;
  }
}
