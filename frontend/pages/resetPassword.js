import { gql, useMutation } from "@apollo/client";
import ResetPassword from "../components/ResetPassword";
import RequestPasswordReset from "../components/RequestPasswordReset";

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`;

const ResetPasswordPage = ({ query }) => {
  const [resetPassword, { data, error, loading }] = useMutation(
    RESET_PASSWORD_MUTATION
  );

  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  if (!query?.token) {
    return (
      <div>
        <p>
          No token can be found for this reset request. Generate a valid token
          by using the below form.
        </p>
        <RequestPasswordReset />
      </div>
    );
  }
  return (
    <div>
      <ResetPassword
        resetPassword={resetPassword}
        data={data}
        error={error || successfulError}
        loading={loading}
        token={query.token}
      />
    </div>
  );
};

export default ResetPasswordPage;
