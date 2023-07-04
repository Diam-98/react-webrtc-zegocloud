import React from 'react';
import {Form, Input, Button, message} from 'antd';
import {useAuth} from "../context/AuthProvider";
import {useNavigate} from "react-router-dom";
import axiosClient from "../api/axiosClient";

function Register() {
    const {setUser, setToken} = useAuth();
    const navigate = useNavigate();
    const register = (values) => {
        axiosClient.post("/register", values)
            .then(({data})=>{
                setUser(data?.data?.user);
                setToken(data?.data?.token)
                navigate("/login");
            }).catch((err)=>{
            console.log(err?.message);
            console.log(err?.response);
            message.error("Impossible de s'incrire veuillez reeseyer");
        })
    }
    const onFinish = (values) => {
        console.log('Form submitted:', values);
        register(values);
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
                <h3>Inscription</h3>
                <Form
                    name="loginForm"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout={"vertical"}
                >

                    <Form.Item
                        name="name"
                        label="Nom"
                        rules={[
                            {
                                required: true,
                                message: 'Veuillez saisir votre nom',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

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
                        <Button type="primary" htmlType="submit">
                            S'inscrire'
                        </Button>
                    </Form.Item>
                </Form>
                Deja un compte ?
                <Button type="link" href="/login">Se connecter</Button>
            </div>
        </>
    );
}

export default Register;