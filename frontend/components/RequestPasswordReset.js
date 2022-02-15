import Form from "./styles/Form";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "../lib/useUser";

const RequestPasswordReset = (props) => {
  const { inputs, handleChange } = useForm({
    userEmail: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await props.requestPasswordReset({
        variables: {
          email: inputs.userEmail,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Forgot password? Reset it.</h2>
      <DisplayError error={props.error} />
      <fieldset disabled={props.loading} aria-busy={props.loading}>
        {props.data?.sendUserPasswordResetLink === null && (
          <p>Reset password link has been sent. Please check your email.</p>
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
        <button type="submit">Send Email</button>
      </fieldset>
    </Form>
  );
};

export default RequestPasswordReset;
