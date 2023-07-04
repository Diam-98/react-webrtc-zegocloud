import React from 'react';
import {Form, Input, Button, message} from 'antd';
import axiosClient from "../api/axiosClient";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthProvider";

const Login = () => {
    const {setUser, setToken} = useAuth();
    const navigate = useNavigate();
    const login = (values) => {
        axiosClient.post("/login", values)
            .then(({data})=>{
                console.log(data)
                setUser(data?.user);
                setToken(data?.token)
                navigate("/home");
            }).catch((err)=>{
            console.log(err?.message);
            console.log(err?.response);
            message.error("Login ou mot de passe incrrect, veuillez reesayer");
        })
    }

    const onFinish = (values) => {
        console.log('Form submitted:', values);
        login(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Form submission failed:', errorInfo);
    };

    const validatePassword = (_, value) => {
        if (value.length < 8) {
            return Promise.reject('Le mot de passe doit contenir au moins 8 caractères');
        }
        return Promise.resolve();
    };

    return (
        <>
            <div className="box">
                <h3>Connexion</h3>
                <Form
                    name="loginForm"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout={"vertical"}
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Veuillez saisir votre adresse email',
                            },
                            {
                                type: 'email',
                                message: 'Veuillez saisir une adresse email valide',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Mot de passe"
                        rules={[
                            {
                                required: true,
                                message: 'Veuillez saisir votre mot de passe',
                            },
                            {
                                validator: validatePassword,
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button className='auth-btn' type="primary" htmlType="submit">
                            Se connecter
                        </Button>

                    </Form.Item>
                </Form>
                Pas de compte ?
                <Button type="link" href="/register">S'inscrire</Button>
            </div>
        </>
    );
};

export default Login;