import React, { useContext, useState } from "react";
import ProfileContext from "./contextProfile.js";

const EditProfile = (props) => {
    const [border, setBorderColor] = useState('1px solid #14142B');
    const [error, setErrorMsg] = useState('');

    const profileId = useContext(ProfileContext);

    const [uName, setUName] = useState('');
    const [uSurname, setUSurname] = useState('');
    const [gender, setGender] = useState('');
    const [uBd, setUBd] = useState('');
    const [uCity, setUCity] = useState('');

    const sendUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            if (uName.length <= 0 || uSurname.length <= 0 || uBd.length <= 0 || uCity.length <= 0) {
                setBorderColor('1px solid #EB0055');
                setErrorMsg('Please, enter new info for profile or close edit form!');
            } else {
                if (gender === '') {
                    setErrorMsg('Please, select profile gender!');
                }

                const data = { "ProfileId": profileId, "ProfileName": uName, "ProfileSurname": uSurname, "ProfileGender": gender, "ProfileBd": uBd, "ProfileCity": uCity };
                const response = await fetch('http://localhost:5000/up-profile/:id', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const jsonData = await response.json();

                window.location.reload();
            }
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
                    <input data-testid="input-name" type="text" id="name" value={uName} onChange={e => setUName(e.target.value)} style={{ borderBottom: border }}></input>
                    <label htmlFor="surname">surname:</label>
                    <input data-testid="input-surname" type="text" id="surname" value={uSurname} onChange={e => setUSurname(e.target.value)} style={{ borderBottom: border }}></input>
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
                    <input data-testid="input-bd" type="text" name="profilebd" id="profiledb" value={uBd} onChange={e => setUBd(e.target.value)} style={{ borderBottom: border }}></input>
                    <label htmlFor="profilec">city:</label>
                    <input data-testid="input-city" type="text" name="profilec" id="profilec" value={uCity} onChange={e => setUCity(e.target.value)} style={{ borderBottom: border }}></input>
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