import { useState } from "react";
import { Image } from "@fluentui/react-components";
import "./Welcome.css";
// import { useData } from "@microsoft/teamsfx-react";
// import { TeamsFxContext } from "../Context";

export function Welcome(props: {
  showFunction?: boolean;
  environment?: string;
}) {
  const [count, setCount] = useState(0);
  // const { teamsUserCredential } = useContext(TeamsFxContext);
  // const { loading, data, error } = useData(async () => {
  //   if (teamsUserCredential) {
  //     const userInfo = await teamsUserCredential.getUserInfo();

  //     return userInfo;
  //   }
  // });

  // const userName = loading || error ? "" : data!.displayName;

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    setCount((prev) => prev + 1);
  }

  return (
    <div className="welcome page">
      <div className="narrow page-padding">
        <Image src="hello.png" />
        <h1 className="center">
          {/* Congratulations{userName ? ", " + userName : ""}! */}
        </h1>
        <button data-testid="btn" onClick={handleClick}>
          increase
        </button>
        <p data-testid="count">{count}</p>
      </div>
    </div>
  );
}
