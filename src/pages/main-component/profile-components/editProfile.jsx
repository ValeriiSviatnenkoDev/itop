import React, { useContext, useState } from "react";

/* profile context */
import { ProfileContext } from "./contextProfile.js";

/* custom hooks */
import useInput from '../../../customHooks/inputHook.js'

const EditProfile = (props) => {
    const [error, setErrorMsg] = useState('');
    const [gender, setGender] = useState('');

    const { profileId } = useContext(ProfileContext);

    const _name = useInput('', true);
    const _surname = useInput('', true);
    const _bd = useInput('', true);
    const _city = useInput('', true);

    const sendUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            
            if (_name.value.length <= 0 || _surname.value.length <= 0 || _bd.value.length <= 0 || _city.value.length <= 0) {
                return setErrorMsg('Please, enter new info for profile or close edit form!');
            }

            if (gender === '') {
                return setErrorMsg('Please, select profile gender!');
            }

            const data = { "ProfileId": profileId, "ProfileName": _name.value, "ProfileSurname": _surname.value, "ProfileGender": gender, "ProfileBd": _bd.value, "ProfileCity": _city.value };
            await fetch('http://localhost:5000/up-profile/:id', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            window.location.reload();

        } catch (error) {
            console.error(error)
        }
    }


    const closeCreate = () => {
        window.location.reload();
    }

    return (
        <div className="main__container-edit">
            <div className="container-edit">
                <form onSubmit={sendUpdateProfile}>
                    <label htmlFor="name">name:</label>
                    <input data-testid="input-name" type="text" id="name" {..._name} style={_name.value.length <= 0 ? { borderBottom: _name._errorstyle } : { borderBottom: '1px solid #14142B' }}></input>
                    <label htmlFor="surname">surname:</label>
                    <input data-testid="input-surname" type="text" id="surname" {..._surname} style={_surname.value.length <= 0 ? { borderBottom: _surname._errorstyle } : { borderBottom: '1px solid #14142B' }}></input>
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
                    <input data-testid="input-bd" type="text" name="profilebd" id="profiledb" {..._bd} style={_bd.value.length <= 0 ? { borderBottom: _bd._errorstyle } : { borderBottom: '1px solid #14142B' }}></input>
                    <label htmlFor="profilec">city:</label>
                    <input data-testid="input-city" type="text" name="profilec" id="profilec" {..._city} style={_city.value.length <= 0 ? { borderBottom: _city._errorstyle } : { borderBottom: '1px solid #14142B' }}></input>
                    <div className="edit-btns">
                        <button data-testid="edit-btn" type='submit' className="accept-change"><i className="fas fa-check"></i></button>
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

export default EditProfile;