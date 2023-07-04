import resolve from "resolve";

class MediaHandler {
    getPermissions(){
        return new Promise((res, rej)=>{
            navigator.mediaDevices.getDisplayMedia({video: true, audio: true})
                .then((stream)=>{
                     resolve(stream);
                }).catch(err=>{
                    throw new Error(err)
            })
        })
    }
}