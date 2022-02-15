import Form from "./styles/Form";
import Router from "next/router";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "../lib/useUser";

const ResetPassword = (props) => {
  const { inputs, handleChange } = useForm({
    userEmail: "",
    userPassword: "",
    token: props.token,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await props.resetPassword({
        variables: {
          email: inputs.userEmail,
          password: inputs.userPassword,
          token: inputs.token,
        },
      });
      if (res.data.redeemUserPasswordResetToken === null) {
        Router.push("/signIn");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset password</h2>
      <DisplayError error={props.error} />
      <fieldset disabled={props.loading} aria-busy={props.loading}>
        {props.data?.redeemUserPasswordResetToken === null && (
          <p>Password has been updated. Please go ahead & Sign In.</p>
        )}

        <label htmlFor="userEmail">
          Email
          <input
            required
            type="email"
            id="userEmail"
            name="userEmail"
            placeholder="Enter email"
            value={inputs.userEmail}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="userPassword">
          Password
          <input
            required
            type="password"
            id="userPassword"
            name="userPassword"
            placeholder="Enter new password"
            value={inputs.userPassword}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Reset Password</button>
      </fieldset>
    </Form>
  );
};

export default ResetPassword;
