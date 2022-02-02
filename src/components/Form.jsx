import React from "react";
// import {Link} from "react-router-dom"
import {useAppState} from "../AppState.jsx";


const Form = (props) => {
    const {state, dispatch} = useAppState();
    const {token} = state
    const action = props.match.params.action
    const [formData, setFormData] = React.useState(state[action])

    const actions = {
        new: () => {
            return fetch(state.url + "/goals", {
                method: "post",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: "bearer " + token,
                },
                body: JSON.stringify(formData),
            }).then((response) => response.json());
            },
        edit: () => {
            return fetch(state.url + "/goals/" + state.edit.id, {
                method: "put",
                headers: {
                    "Content-Type":"application/json",
                    Authorization: "bearer " + token,
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
        actions[action]().then((data) => {
            props.getGoals()
            props.history.push("/dashboard");        
        });
    };

    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <input type="text" name="goal" placeholder="enter goal" value={formData.goal} onChange={handleChange} />
                <input type="text" name="target_date" placeholder="date" value={formData.target_date} onChange={handleChange} />
                <input type="text" name="notes" placeholder="enter notes" value={formData.notes} onChange={handleChange} />
                <input type="text" name="completed" placeholder="completed?" value={formData.completed} onChange={handleChange} />
                <input type="submit" value={action} />

            </form>
        </div> 
    )
}
    

export default Form