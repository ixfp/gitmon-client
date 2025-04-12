'use client'

import GitHubIcon from "@assets/GithubIcon"

function GithubLoginButton() {
  const handleLoginClick = () => {
    const githubAuthUrl = `https://api.gitmon.blog/api/v1/login/oauth/github
`;

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
