import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GoogleAuthButton() {
    const navigate = useNavigate();
    const handleSuccess = async (credentialResponse) => {
        const deviceInfo = {
            user_agent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            client_type: "web"
        };

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}google-login/`,
                {
                    token: credentialResponse.credential,
                    device_info: deviceInfo
                }
            );

            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/dashboard");

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.log("Login Failed")}
        />
    );
}

export default GoogleAuthButton;