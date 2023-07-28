import { useContext } from 'react';
import Collapse from 'react-bootstrap/Collapse'
import Alert from 'react-bootstrap/Alert'
import { FlashContext } from '../contexts/FlashProvider'

export default function FlashMessage() {
    const { flashMessage, visible, hideFlash } = useContext(FlashContext);
    return (
        <Collapse in={visible}>
            <div>
                <Alert variant={flashMessage.type || 'info'} dismissable
                    onClose={hideFlash}>
                    {flashMessage.message}
                </Alert>
            </div>
        </Collapse>
    );
}