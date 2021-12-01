import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
    const [uName, setUName] = useState('');
    const [uSurname, setUSurname] = useState('');
    const [uMGender, setUMGender] = useState('');
    const [uFGender, setUFGender] = useState('');
    const [uBd, setUBd] = useState('');
    const [uCity, setUCity] = useState('');
    const [uId, setUId] = useState('');
    let gender, navigate = useNavigate();

    const createProfile = async(e) => {
        e.preventDefault();
        try {
            if(uMGender) {
                gender = 'Male';
            } else if(uFGender) {
                gender = 'Female';
            } else {
                return alert('Please, select profile gender!');;
            }

            const uid = JSON.parse(localStorage.getItem('user')); 
            setUId(uid.userid);

            const data = { "ProfileUserId": uId, "ProfileName": uName, "ProfileSurname": uSurname, "ProfileGender": gender, "ProfileBd": uBd, "ProfileCity": uCity };
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
                    <input data-testid="input-name" type="text" id="name" value={uName} onChange={e => setUName(e.target.value)}></input>                        
                    <label htmlFor="surname">surname:</label>
                    <input data-testid="input-surname" type="text" id="surname" value={uSurname} onChange={e => setUSurname(e.target.value)}></input>
                    <label>gender:</label>
                    <div className="radio-gender">
                        <div className="male">
                            <input type="radio" name="gender" id="male" value="male" onChange={e => setUMGender(e.target.checked)}></input>
                            <label htmlFor="male">male</label>
                        </div>
                        <div className="male">
                            <input type="radio" name="gender" id="female" value="female" onChange={e => setUFGender(e.target.checked)}></input>
                            <label htmlFor="female">female</label>
                        </div>
                    </div>
                    <label htmlFor="profiledb">birthdate:</label>
                    <input data-testid="input-bd" type="text" name="profilebd" id="profiledb" value={uBd} onChange={e => setUBd(e.target.value)}></input>
                    <label htmlFor="profilec">city:</label>
                    <input data-testid="input-city" type="text" name="profilec" id="profilec" value={uCity} onChange={e => setUCity(e.target.value)}></input>
                    <div className="edit-btns">
                        <button data-testid="accept" type='submit' className="accept-change"><i className="fas fa-check"></i></button>
                        <button onClick={closeCreate} type='submit' className="reject-change"><i className="fas fa-times"></i></button>
                    </div>
                </form>
            </div>
        
        </div>
    );
}

export default CreateProfile;