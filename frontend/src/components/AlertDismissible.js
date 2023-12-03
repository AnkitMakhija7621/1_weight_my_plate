import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const AlertDismissible = ({ text }) => {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant="light" onClose={() => setShow(false)} dismissible>
                <img src="../../../backend/images/prediction.jpg"></img>
                <p>
                    {text}
                </p>
            </Alert>
        );
    }
    return <Button onClick={() => setShow(true)}>Show Alert</Button>;
};

export default AlertDismissible;