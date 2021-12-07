import { useState } from 'react';

const useInput = (initial, required) => {
    const [value, setValue] = useState(initial);
    const [_errorstyle, setErrStyle] = useState(null);
    const [_errmsg, setErrMsg] = useState(null);

    return {
        value,
        _errorstyle,
        _errmsg,
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