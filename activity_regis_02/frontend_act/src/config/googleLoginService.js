import axios from "axios";

const googleLogin = async (accesstoken) => {
    let result = await axios.post(
        "http://localhost:8000/api/rest-auth/google/",
        {
            access_token: accesstoken,
        }
    );
    console.log(result);
    return await result.status;
};

export default googleLogin;