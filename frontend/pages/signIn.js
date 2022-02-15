import styled from "styled-components";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import { gql, useMutation } from "@apollo/client";
import RequestPasswordReset from "../components/RequestPasswordReset";

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          name
          email
        }
      }

      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;

const REQUEST_PASSWORD_RESET_MUTATION = gql`
  mutation REQUEST_PASSWORD_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

const SignInPage = () => {
  const [signIn, { data: signInData, loading: signInLoading }] =
    useMutation(SIGN_IN_MUTATION);

  const [
    signUp,
    { data: signUpData, error: signUpError, loading: signUpLoading },
  ] = useMutation(SIGN_UP_MUTATION);

  const [
    requestPasswordReset,
    {
      data: requestPasswordResetData,
      error: requestPasswordResetError,
      loading: requestPasswordResetLoading,
    },
  ] = useMutation(REQUEST_PASSWORD_RESET_MUTATION);

  const signInError =
    signInData?.authenticateUserWithPassword?.__typename ===
    "UserAuthenticationWithPasswordFailure"
      ? signInData.authenticateUserWithPassword
      : undefined;

  return (
    <GridStyles>
      <SignIn signIn={signIn} error={signInError} loading={signInLoading} />
      <SignUp
        signUp={signUp}
        data={signUpData}
        error={signUpError}
        loading={signUpLoading}
      />
      <RequestPasswordReset
        requestPasswordReset={requestPasswordReset}
        data={requestPasswordResetData}
        error={requestPasswordResetError}
        loading={requestPasswordResetLoading}
      />
    </GridStyles>
  );
};

export default SignInPage;
