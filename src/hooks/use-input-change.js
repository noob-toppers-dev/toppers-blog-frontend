import { useState } from 'react';

const useInputChange = (initialValue) => {
  const [inputValues, setInputValues] = useState(initialValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  return {
    inputValues,
    handleChange,
    setInputValues
  };
};

export default useInputChange;
