import axios from "axios";

function Register() {
  const register = async () => {
    await axios.post("http://localhost:5000/api/v1/auth/register", {
      email: "test@gmail.com",
      password: "123456",
      role: "user"
    });
    alert("Registered");
  };

  return <button onClick={register}>Register</button>;
}

export default Register;
