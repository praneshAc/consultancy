import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
const useSignup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const registerUser = async (values) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      console.log(data);
      if (res.status === 201) {
        message.success(data.message);

        setTimeout(() => {
          navigate("/signin");
        }, 350);
      } else if (res.status === 400) {
        setError(message);
      } else {
        message.error("Registration failed");
      }
    } catch (err) {
      message.error(err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, registerUser };
};
export default useSignup;
