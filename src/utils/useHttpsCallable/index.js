import {useState} from 'react';
import {functions} from '../../config/Firebase';
import {httpsCallable} from 'firebase/functions';

export const useHttpsCallable = functionName => {
  // console.log("hello from useHttpsCallable: ", functionName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const executeCallable = async data => {
    // const callable = httpsCallable(functions, functionName);
    try {
      setLoading(true);
      console.log('data: ', data);
      // const response = await callable(data);
      // const response = await functions().httpsCallable(functionName)(data);
      const response = await fetch(
        'http://localhost:5001/tiktok/us-central1/createPaymentIntent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              amount: 999,
            },
          }),
        },
      );
      console.log('response: ', response.data);
      return response.data;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    error,
    call: executeCallable,
  };
};
