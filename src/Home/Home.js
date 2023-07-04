import React, {useCallback, useEffect, useState} from 'react';
import {Avatar, Button} from "antd";
import {useAuth} from "../context/AuthProvider";
import {Navigate, useLocation, useNavigate} from "react-router-dom";



const Home = () => {
    const { user, token } = useAuth();
    const location = useLocation();
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    // const [loading, setLoading] = useState(true);


    // const getUsers = () => {
    //     axiosClient.get("/logged")
    //         .then(({data})=>{
    //             console.log("is it updating ?")
    //             console.log("data: ", data)
    //             setUser(data?.user);
    //             setLoading(false);
    //         }).catch((err) => {
    //         console.error(err);
    //         setLoading(false);
    //         navigate("/login", { state: { from: location }, replace: true });
    //     })
    // };
    //
    // useEffect(() => {
    //     getUsers();
    // }, []);

    const handleJoin = useCallback(()=>{
        navigate(`/home/room/${value}`)
    },[navigate, value])

    if (!token) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // if (loading){
    //     return <p>Chargement en cours</p>;
    // }
    // console.log(user)



    return (
        <>
            <div className="home-container">
                <div className="nav">
                    <h3>Appel Video</h3>
                    <div className="user-profile">
                        <Avatar>{user?.name}</Avatar>
                        <div className="user-info">
                            <p>{user?.name}</p>
                        </div>
                        <Button type="link" href="" className="logout-btn">Logout</Button>
                    </div>
                </div>

                <input type="text" onChange={(event) => setValue(event.target.value)} placeholder="Enter room code"/>
                <button onClick={handleJoin}>Join</button>
            </div>
        </>
    );
};

export default Home;