import axios from "axios";

const fbLogin = async (accesstoken) => {
    let result = await axios.post(
        "http://localhost:8000/api/rest-auth/facebook/",
        {
            access_token: accesstoken,
        }
    );
    console.log(result);
    
    return await result.status;
};

export default fbLogin;