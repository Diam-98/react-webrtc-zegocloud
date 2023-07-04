import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import {useParams} from "react-router-dom";

const VideoZego = () => {
    const containerRef = useRef(null);
    const {roomID} = useParams();

    useEffect(() => {
        const myMeeting = async () => {
            // Generate kit token
            // const appID = 835742968;
            // const appServerSecret = 'e48fccac51714e5235d4b847fb9199b0';
            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                835742968,
                'e48fccac51714e5235d4b847fb9199b0',
                roomID,
                Date.now().toString(),
                'Diam Diallo'
            );

            // Create an instance of ZegoUIKitPrebuilt
            const zp = ZegoUIKitPrebuilt.create(kitToken);

            // Join the room
            zp.joinRoom({
                container: containerRef.current,
                sharedLinks: [
                    {
                        name: "Personal link",
                        url: `http://localhost:3000/home/room/${roomID}`
                        // url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`
                    }
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall
                }
            });
        };

        myMeeting();
    }, [roomID]);

    return (
        <div ref={containerRef} style={{ width: "100vw", height: "100vh" }}></div>
    );
};

export default VideoZego;