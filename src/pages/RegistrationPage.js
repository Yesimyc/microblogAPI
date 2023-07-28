import Body from '../components/Body';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputField from '../components/InputField';
import { useState, useRef, useEffect } from 'react';
import { useApi } from '../contexts/ApiProvider';
import { useNavigate } from 'react-router-dom';
import { useFlash } from '../contexts/FlashProvider';

export default function RegistrationPage() {
    const [formErrors, setFormErrors] = useState({});
    const usernameField = useRef();
    const emailField = useRef();
    const passwordField = useRef();
    const password2Field = useRef();
    const api = useApi();
    const navigate = useNavigate();
    const flash = useFlash();


    useEffect(() => {
        usernameField.current.focus()
    }, []);

    const onSubmit = async (ev) => {
        ev.preventDefault();
        if(passwordField.current.value != password2Field.current.value){
            setFormErrors({password2: "Password doesn't match"})
        }else{
            const data = await api.post('/users',{
                username: usernameField.current.value,
                email: emailField.current.value,
                password: passwordField.current.value,
            });
            if(!data.ok){
                setFormErrors(data.body.errors.json);
            }else{
                setFormErrors({});
                navigate('/login');
                flash('Your registration has benn successful','success')
            }
        }
    }

   return (

        <Body>
            <p>Registration</p>
            <Form onSubmit={onSubmit}>
                <InputField
                    name="username" label="Username"
                    error={formErrors.username} fieldRef={usernameField} />
                <InputField
                    name="email" label="Email Address"
                    error={formErrors.email} fieldRef={emailField} />
                <InputField
                    name="password" label="Password" type="password"
                    error={formErrors.password} fieldRef={passwordField} />
                <InputField
                    name="password2" label="Password again" type="password"
                    error={formErrors.password2} fieldRef={password2Field} />
                    <Button variant="primary" type="submit">Register</Button>
            </Form>
        </Body>
    );
}