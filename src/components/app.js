import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import PayForm from './stripe';
import Contacts from './contacts';

var isFirstLoad = true;
var isFirstLoadB = true;

const App = (props) => {
    //console.log("APP", props);
    if (props.id === "Unknown")
        return window.location = "/login";

    if (!props.token && !props.isLoading) {
        props.getToken (props.id)
            .then( token => {
                if (token) localStorage.setItem("token", token);
            });
    }

    if (isFirstLoad && props.contacts.length === 0 && !props.isLoading) {
        isFirstLoad = false;
        props.getContacts (props.id)
        .then( contacts => {
            if (contacts) localStorage.setItem("contacts", JSON.stringify(contacts));
        });
    }
    
    if (isFirstLoadB && !props.balance) {
        isFirstLoadB = false;
        props.getBalance(props.id);
    }

    const handleClick = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        localStorage.removeItem("contacts");
        
        return window.location = "/login";
    }

	return (
        <div>
            {
            !props.token ? <span className="spinner-border"></span> : 
            <div>
                <div className="form-group m-3 d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary" onClick={handleClick}>Logout</button>
                </div>
                <div className="form-group m-3">
                    <p>User: {props.name}</p>
                    <p>Balance: {props.balance ? props.balance.toFixed(2): "0"}</p>
                </div>
                <div className="form-group d-flex justify-content-center align-items-center flex-column">
                    { props.isLoading ? <span className="spinner-border"></span> : "" }
                    { props.lastError ? <span className="alert-warning">{props.lastError}</span> : "" }
                </div>
                <div className="form-group">
                    <PayForm setError={props.setError} pay={props.pay} id={props.id} balance={props.getBalance}/>
                </div>
                <div className="form-group m-3 d-flex justify-content-between align-items-center">
                    <Contacts 
                        checkout={props.checkout} balance={props.getBalance}
                        token={props.token} error={props.setError}
                        contacts={props.contacts} add={props.addContact} refresh={props.getContacts}
                        userId={props.id} delete={props.deleteContact} />
                </div>
            </div>
            }
        </div>
    )
}

export default App;
