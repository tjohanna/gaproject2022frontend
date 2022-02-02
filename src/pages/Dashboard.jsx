import React from "react";
import {useAppState} from "../AppState.jsx";
import {Route, Link} from "react-router-dom";
import Form from "../components/Form.jsx";

const Dashboard = (props) => {
    const {state, dispatch} = useAppState()
    const {token, url, goals, username} = state; 

    const getGoals = async () => {
        const response = await fetch(url + "/goals/", {
            method: "get",
            headers: {
                Authorization: "bearer " + token
            },
        });
        const fetchedGoals = await response.json();
        dispatch({type: "getGoals", payload: fetchedGoals})
    }

    React.useEffect(() => {
        getGoals();
    }, []);


    const loaded = () => {
        // console.log(state);
        return (
        <div className="dashboard">
        <h1>2022 Goals</h1>
        <p>{username}</p>
        <Link to="/dashboard/new/"><button>Create New Goal</button></Link>
        <Route path="/dashboard/:action" 
        render={(rp) => <Form {...rp} getGoals={getGoals} />} 
        />
        <ul>
            {state.goals.map((goal) => (
                <div className="goal" key={goal.id}>
                    <h2>My goal is to: {goal.goal}</h2>
                    <h4>Target Date: {goal.target_date}</h4>
                    <h4>Notes: {goal.notes}</h4>
                    <h4>Status: {goal.completed}</h4>
                    <button onClick="this.value='DONE'" type="button" value="Update Status">Update Status</button>




                        <button onClick={() => {
                            dispatch({type: "select", payload: goal})
                            props.history.push("/dashboard/edit")
                        }}>Edit Goal</button>
                        <button onClick={() => {
                            fetch(url + "/goals/" + goal.id, {
                                method: "delete",
                                headers: {
                                    Authroization: "bearer " + token,
                                }
                            })
                            .then(() => getGoals())
                        }}>Delete Goal</button>
                </div>
            ))}
        </ul>
        </div>
    );
};

    return goals ? loaded() : <h1> Loading ... </h1>;
    // <h1>Dashboard</h1>
};

export default Dashboard;