import GitHubIcon from "@assets/GithubIcon";

function GithubLoginButton() {
  const handleLoginClick = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;

    window.location.href = githubAuthUrl;
  };

  return (
    <button
      onClick={handleLoginClick}
      className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 active:scale-95 shadow-md transition-all flex items-center space-x-2"
    >
      <GitHubIcon className="h-5 w-5" />
      <span>Sign in with GitHub</span>
    </button>
  );
}

export default GithubLoginButton;
