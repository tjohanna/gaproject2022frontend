import React from "react"
import {useAppState} from "../AppState.jsx"

const Auth = (props) => {
    const type = props.match.params.form
    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
    });

const [userData, setUserData] = React.useState(null);
const { state, dispatch} = useAppState();
console.log(state)

React.useEffect(() => {
    if (userData) {
        console.log(userData)
        const { token, user} = userData;
        dispatch({type:"auth",payload:{token, username: user.username}});
        //saving token and username in local storage
        window.localStorage.setItem("auth", JSON.stringify({token, username: user.username}))
        // allows you to change URL - sending to Dashboard page
        props.history.push("/dashboard")
    }
}, [userData]);

const actions = {
    signup: () => {
        return fetch(state.url + "/users", {
            method: "post",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(formData),
        }).then((response) => response.json());
        },
        login: () => {
            return fetch(state.url + "/login", {
                method: "post",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json());
            },
        };

    const handleChange = (event) => {
        setFormData({... formData, [event.target.name] : event.target.value})
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        actions[type]().then((data) => {
            setUserData(data)
        });
    };

    return (
    <div className="auth">
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            <input type="submit" value={type} />
        </form>
    </div>
    )
}

export default Auth