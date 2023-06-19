// https://fluentsite.z22.web.core.windows.net/quick-start
import {
  FluentProvider,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  tokens,
} from "@fluentui/react-components";
import { useEffect } from "react";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { app } from "@microsoft/teams-js";
import { useTeamsUserCredential } from "@microsoft/teamsfx-react";
// import {
//   BearerTokenAuthProvider,
//   createApiClient,
//   TeamsUserCredential,
// } from "@microsoft/teamsfx";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import Tab from "./Tab";
import TabConfig from "./TabConfig";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  // const credential = new TeamsUserCredential(config);

  // const scope = [process.env.TEAMFOLIO_SCOPE];
  // const apiClient = createApiClient(
  //   "https://localhost:4000",
  //   new BearerTokenAuthProvider(async () => (await credential.getToken("api://8877ebd4-0160-4d5c-9ed6-e75500ba3c01/Spike.Read"))?.token!)
  // );

  const { loading, theme, themeString, teamsUserCredential } =
    useTeamsUserCredential({
      initiateLoginEndpoint: config.initiateLoginEndpoint!,
      clientId: config.clientId!,
    });
  useEffect(() => {
    loading &&
      app.initialize().then(() => {
        // Hide the loading indicator.
        app.notifySuccess();
      });
  }, [loading]);

  // useEffect(() => {
  //   !loading &&
  //     (async () => {
  //       if (teamsUserCredential) {
  //         try {
  //           // await teamsUserCredential.login("User.Read.All");
  //           await teamsUserCredential.getToken([
  //             "api://8877ebd4-0160-4d5c-9ed6-e75500ba3c01/Spike.Read",
  //           ]);
  //         } catch (error) {
  //           console.log(error);
  //           await teamsUserCredential.login(
  //             "api://8877ebd4-0160-4d5c-9ed6-e75500ba3c01/Spike.Read"
  //           );
  //         }
  //       }
  //     })();
  // }, [loading, teamsUserCredential]);

  // useEffect(() => {
  //   (async () => {
  //     const x = await test();
  //     console.log(x);
  //   })();
  // }, []);

  return (
    <TeamsFxContext.Provider
      value={{ theme, themeString, teamsUserCredential }}
    >
      <FluentProvider
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
            ? teamsHighContrastTheme
            : {
                ...teamsLightTheme,
                colorNeutralBackground3: "#eeeeee",
              }
        }
        style={{ background: tokens.colorNeutralBackground3 }}
      >
        <Router>
          {!loading && (
            <Routes>
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/termsofuse" element={<TermsOfUse />} />
              <Route path="/tab" element={<Tab />} />
              <Route path="/config" element={<TabConfig />} />
              <Route path="*" element={<Navigate to={"/tab"} />}></Route>
            </Routes>
          )}
        </Router>
      </FluentProvider>
    </TeamsFxContext.Provider>
  );
}
