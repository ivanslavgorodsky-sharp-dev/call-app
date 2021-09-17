import React, { useState } from 'react';
import Dial from './dialer';
import { Device } from "@twilio/voice-sdk";

const CROSS = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
<path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
</svg>;

const Contacts = (props) => {
    const [formState, setFormState] = useState({name: "", phone: ""});

    const device = new Device(props.token);

    const handleChange = (evt) => {
        setFormState({
          ...formState,
          [evt.target.name]: evt.target.value,
        });
      };
    const handleSubmit = (evt) => {    
        evt.preventDefault();

        props.add(props.userId, formState.name, formState.phone)
            .then( contact => {
                setFormState({name: "", phone: ""});

                props.refresh (props.userId)
                .then( contacts => {
                    if (contacts) localStorage.setItem("contacts", JSON.stringify(contacts));
                });
            });
    }
    const handleDelete = (id) => {
        props.delete(id)
        .then( deleted => {
            props.refresh (props.userId)
            .then( contacts => {
                if (contacts) localStorage.setItem("contacts", JSON.stringify(contacts));
            });
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Add contact</h3>
                <div className="form-group m-3 d-flex justify-content-center align-items-center flex-row">
                    <input name="name"
                        type="text" className="form-control" placeholder="Enter name"
                        value={formState.name} onChange={handleChange} required autoComplete="off" />
                    <input name="phone"
                        type="text" className="form-control" placeholder="Enter phone"
                        value={formState.phone} onChange={handleChange} required autoComplete="off" />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            <h2>Contacts</h2>
                <div className="form-group d-flex justify-content-between align-items-center flex-row">
                    <div>#</div>
                    <div>NAME</div>
                    <div>PHONE</div>
                    <div>ACTIONS</div>
                </div>
            {
                props.contacts.map( (item, i) => {
                    return (
                        <div key={i} className="form-group d-flex m-1 justify-content-between align-items-center flex-row"
                            style={{borderBottom: "1px solid #ccc", padding: "5px"}}>
                            <div>{i+1}</div>
                            <div>{item.name}</div>
                            <div>{item.phone}</div>
                            <div className="d-flex justify-content-between align-items-center flex-row">
                                <button title="Delete" className="btn" onClick={handleDelete.bind(this, item._id)}>{CROSS}</button>
                                <Dial
                                    id={props.userId} balance={props.balance}
                                    checkout={props.checkout} device={device} phone={item.phone} />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Contacts;
