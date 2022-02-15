import { gql, useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "../lib/useUser";

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

const SignOut = () => {
  const [signOut] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button type="button" onClick={signOut}>
      Sign Out
    </button>
  );
};

export default SignOut;
