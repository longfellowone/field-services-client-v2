import React, { useEffect, useState, useRef, useReducer } from "react";
import { Link } from "react-router-dom";

export const Test = () => {
const [input, setInput] = useState("world");
const [data, refetch] = useGrpcQuery(myRequest, { name: "init" }, []);

// useEffect(() => console.clear(), []);

const handleOnClick = () => refetch({ name: input });

return (
<>
<Link to="/">Unmount</Link>
<br />
{data}
<br />
<input onChange={e => setInput(e.target.value)} value={input} />
<button onClick={handleOnClick}>New Request</button>
</>
);
};

// Make command hook
const useGrpcQuery = (request, variables, initialData) => {
const [state, dispatch] = useReducer(requestReducer, {
isLoading: false,
isError: false,
data: initialData
});
const mounted = useRef(true);

const makeRequest = async newVariables => {
dispatch({ type: "REQUEST_START" });

    const params = {
      ...variables,
      ...newVariables
    };

    try {
      const response = await request(params);
      if (!mounted.current) return;
      dispatch({ type: "REQUEST_SUCCESS", payload: response });
    } catch (error) {
      console.log("error: ", error);
      if (!mounted.current) return;
      dispatch({ type: "REQUEST_ERROR" });
    }

};

useEffect(() => {
makeRequest();
return () => (mounted.current = false);
}, []);

return [state.data, makeRequest];
};

const requestReducer = (state, action) => {
switch (action.type) {
case "REQUEST_START":
return {
...state,
isLoading: true,
isError: false
};
case "REQUEST_SUCCESS":
return {
...state,
isLoading: false,
isError: false,
data: action.payload
};
case "REQUEST_ERROR":
return {
...state,
isLoading: false,
isError: true
};
default:
throw new Error();
}
};

const myRequest = ({ name }) => {
return new Promise((resolve, reject) => {
setTimeout(() => {
resolve(name);
// reject("failed");
}, 2000);
});
};
