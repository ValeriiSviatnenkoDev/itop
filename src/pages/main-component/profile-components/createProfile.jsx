import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* utils for client */
import { getLocaleStorage } from "../../../client-utils/util-locale-storage.js"

/* custom hooks */
import useInput from '../../../customHooks/inputHook.js'

const CreateProfile = () => {
    const _name = useInput('', true);
    const _surname = useInput('', true);
    const _bd = useInput('', true);
    const _city = useInput('', true);

    const [gender, setGender] = useState('');

    const [uId, setUId] = useState('');
    const [error, setErrorMsg] = useState('');

    let navigate = useNavigate();
    
    const createProfile = async(e) => {
        e.preventDefault();
        try {
            if(_name.value.length <= 0 || _surname.value.length <= 0 || _bd.value.length <= 0 || _city.value.length <= 0) {
                return setErrorMsg("Please enter all data for create profile!");
            }

            if (gender === '') {
                return setErrorMsg('Please, select profile gender!');
            }

            const uid = getLocaleStorage('user', true); 
            setUId(uid.userid);

            const data = { "ProfileUserId": uId, "ProfileName": _name.value, "ProfileSurname": _surname.value, "ProfileGender": gender, "ProfileBd": _bd.value, "ProfileCity": _city.value };
            const response = await fetch('http://localhost:5000/profile-create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const jsonData = await response.json();
            navigate('/get-profiles', {replace: true});
            window.location.reload();
        } catch (error) {
            console.error(error)
        }
    }

    const closeCreate = () => {
        window.location.reload();
    }
    
    return(
        <div className="main__container-edit">
            <div className="container-edit">
                <form onSubmit={createProfile}>
                    <label htmlFor="name">name:</label>
                    <input data-testid="input-name" type="text" id="name" {..._name} style={_name.value.length <= 0 ? {borderBottom: _name.errStyle} : {borderBottom: '1px solid #14142B'}}></input>                        
                    <label htmlFor="surname">surname:</label>
                    <input data-testid="input-surname" type="text" id="surname" {..._surname} style={_surname.value.length <= 0 ? {borderBottom: _surname.errStyle} : {borderBottom: '1px solid #14142B'}}></input>
                    <label>gender:</label>
                    <div className="radio-gender">
                        <div className="male">
                            <input type="radio" name="gender" id="male" value="male" onChange={e => e.target.checked && setGender('Male')}></input>
                            <label htmlFor="male">male</label>
                        </div>
                        <div className="male">
                            <input type="radio" name="gender" id="female" value="female" onChange={e => e.target.checked && setGender('Female')}></input>
                            <label htmlFor="female">female</label>
                        </div>
                    </div>
                    <label htmlFor="profiledb">birthdate:</label>
                    <input data-testid="input-bd" type="text" name="profilebd" id="profiledb" {..._bd} style={_bd.value.length <= 0 ? {borderBottom: _bd.errStyle} : {borderBottom: '1px solid #14142B'}}></input>
                    <label htmlFor="profilec">city:</label>
                    <input data-testid="input-city" type="text" name="profilec" id="profilec" {..._city} style={_city.value.length <= 0 ? {borderBottom: _city.errStyle} : {borderBottom: '1px solid #14142B'}}></input>
                    <div className="edit-btns">
                        <button data-testid="accept" type='submit' className="accept-change"><i className="fas fa-check"></i></button>
                        <button onClick={closeCreate} type='submit' className="reject-change"><i className="fas fa-times"></i></button>
                    </div>
                </form>
            </div>
            <div className="container-error">
                <p>{error}</p>
            </div>
        </div>
    );
}

export default CreateProfile;