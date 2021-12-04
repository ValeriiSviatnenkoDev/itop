import { useState } from 'react';

const useInput = (initial, required) => {
    const [value, setValue] = useState(initial);
    const [errStyle, setErrStyle] = useState(null);
    const [errMsg, setErrMsg] = useState(null);

    return {
        value,
        errStyle,
        errMsg,
        onChange: e => setValue(e.target.value),
        onBlur: e => {
            if(!e.target.value && required) {
                setErrStyle('1px solid #EB0055');
                setErrMsg('Please enter your data for authorization!');
            } else {
                setErrStyle(null);
                setErrMsg(null);
            }
        } 
    }
}

export default useInput;