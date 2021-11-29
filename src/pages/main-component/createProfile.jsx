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

            const data = { "ProfileUserId": uId, "ProfileName": uName, "ProfileSurname": uSurname, "ProfileGender": gender, "ProfileBd": uBd, "ProfileCity": uCity};
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
        <div class="main__container-edit">
            <div class="container-edit">
                <form onSubmit={createProfile}>
                    <label for="name">name:</label>
                    <input type="text" id="name" value={uName} onChange={e => setUName(e.target.value)}></input>                        
                    <label for="surname">surname:</label>
                    <input type="text" id="surname" value={uSurname} onChange={e => setUSurname(e.target.value)}></input>
                    <label>gender:</label>
                    <div class="radio-gender">
                        <div class="male">
                            <input type="radio" name="gender" id="male" value="male" onChange={e => setUMGender(e.target.checked)}></input>
                            <label for="male">male</label>
                        </div>
                        <div class="male">
                            <input type="radio" name="gender" id="female" value="female" onChange={e => setUFGender(e.target.checked)}></input>
                            <label for="female">female</label>
                        </div>
                    </div>
                    <label for="profiledb">birthdate:</label>
                    <input type="text" name="profilebd" id="profiledb" value={uBd} onChange={e => setUBd(e.target.value)}></input>
                    <label for="profilec">city:</label>
                    <input type="text" name="profilec" id="profilec" value={uCity} onChange={e => setUCity(e.target.value)}></input>
                    <div class="edit-btns">
                        <button type='submit' class="accept-change"><i class="fas fa-check"></i></button>
                        <button onClick={closeCreate} type='submit' class="reject-change"><i class="fas fa-times"></i></button>
                    </div>
                </form>
            </div>
        
        </div>
    );
}

export default CreateProfile;