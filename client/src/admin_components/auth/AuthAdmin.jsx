import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL, doApiGet } from '../../services/services';

const AuthAdmin = () => {
    const nav = useNavigate();

    useEffect(() => {
        doApi();
    }, []);


    const doApi = async () => {
        let url = API_URL + "/users/checkToken"
        try {
            let data = await doApiGet(url);
            if (data.role != "admin") {
                alert("You need to be an admin in order to log in.")
                nav("/admin/login")
            }
        }
        catch (err) {
            alert("You need to be an admin in order to log in.")
            nav("/admin/login")
        }
    }


    return (
        <React.Fragment>

        </React.Fragment>
    )

}

export default AuthAdmin
