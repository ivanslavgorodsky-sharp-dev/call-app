import React, { useState } from 'react';

const PHONE = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-phone" viewBox="0 0 16 16">
  <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
  <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
</svg>

const Dialer = (props) => {
    const [calling, setCalling] = useState(false);
    const handleCall = () => {

        if (calling) {
            console.log("disconnecting...");
            setCalling(false);
            props.device.disconnectAll();
        }
        else {
            console.log("Calling to " + props.phone);
            setCalling(true);
            props.checkout(props.id)
                .then( res => {
                    if (res === "Success")
                        props.balance(props.id);
                });
            props.device.connect({ 
                params: {
                    To: props.phone
                }
            });
        }
    }

	return (
        <div>
            <button title="Call" className={calling ? "btn btn-danger" : "btn btn-success"} onClick={handleCall}>{PHONE}</button>
        </div>
    )
}

export default Dialer;
