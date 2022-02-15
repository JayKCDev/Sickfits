import Form from "./styles/Form";
import Router from "next/router";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import { CURRENT_USER_QUERY } from "../lib/useUser";

const SignIn = (props) => {
  const { inputs, handleChange } = useForm({
    userEmail: "",
    userPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await props.signIn({
        variables: {
          email: inputs.userEmail,
          password: inputs.userPassword,
        },
        refetchQueries: [{ query: CURRENT_USER_QUERY }],
      });
      if (
        res?.data?.authenticateUserWithPassword?.__typename ===
        "UserAuthenticationWithPasswordSuccess"
      ) {
        Router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign In into your account</h2>
      <DisplayError error={props.error} />
      <fieldset disabled={props.loading} aria-busy={props.loading}>
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
        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  );
};

export default SignIn;
