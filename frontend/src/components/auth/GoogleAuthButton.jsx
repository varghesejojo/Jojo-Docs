import { GoogleLogin } from "@react-oauth/google";

function GoogleAuthButton() {
  const handleSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Login Failed")}
    />
  );
}

export default GoogleAuthButton;