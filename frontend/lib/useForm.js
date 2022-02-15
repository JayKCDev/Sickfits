import { useState } from "react";

const useForm = (initial = {}) => {
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    let { name, value, type } = e.target;
    if (type === "number") {
      value = +value;
    }
    if (type === "file") {
      [value] = e.target.files;
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  return {
    inputs,
    handleChange,
  };
};

export default useForm;
