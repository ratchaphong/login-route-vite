import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const [data, setData] = useState({
    email: "ratchaphongc1@gmail.com",
    password: "ratcha",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    login(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email Address</label>
        <input
          id="email"
          name="email"
          value={data.email}
          onChange={(e) => {
            setData({ ...data, [e.target.name]: e.target.value });
          }}
        />
        <label>Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={(e) => {
            setData({ ...data, [e.target.name]: e.target.value });
          }}
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
