function GithubLoginButton() {
  const handleLoginClick = () => {
    const clientId = "Ov23liBd0Vxl4CeZ0KeQ";
    const redirectUri = "http://127.0.0.1:5173/auth/callback";
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;

    window.location.href = githubAuthUrl;
  };
  return <button onClick={handleLoginClick}>GithubLoginButton</button>;
}

export default GithubLoginButton;
