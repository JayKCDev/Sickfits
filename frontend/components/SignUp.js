import Form from "./styles/Form";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "../lib/useUser";

const SignUp = (props) => {
  const { inputs, handleChange } = useForm({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await props.signUp({
        variables: {
          name: inputs.userName,
          email: inputs.userEmail,
          password: inputs.userPassword,
        },
        // refetchQueries: [{ query: CURRENT_USER_QUERY }],
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up for an account</h2>
      <DisplayError error={props.error} />
      <fieldset disabled={props.loading} aria-busy={props.loading}>
        {props.data?.createUser && (
          <p>Sign Up successful. Please go ahead & Sign In!</p>
        )}
        <label htmlFor="userName">
          Name
          <input
            required
            type="text"
            id="userName"
            name="userName"
            placeholder="Enter name"
            value={inputs.userName}
            onChange={handleChange}
          />
        </label>
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
            placeholder="Enter password"
            value={inputs.userPassword}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign Up</button>
      </fieldset>
    </Form>
  );
};

export default SignUp;
