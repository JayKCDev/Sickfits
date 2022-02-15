import SignIn from "./SignIn";
import { useUser } from "../lib/useUser";

const PleaseSignIn = ({ children }) => {
  const user = useUser();
  if (!user) {
    return <SignIn />;
  }
  return children;
};

export default PleaseSignIn;
