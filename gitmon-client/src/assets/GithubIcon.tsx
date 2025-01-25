import React from "react";

const GitHubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.166 6.839 9.49.5.091.683-.216.683-.48 0-.237-.01-.868-.013-1.704-2.782.604-3.37-1.34-3.37-1.34-.454-1.155-1.11-1.464-1.11-1.464-.91-.624.068-.611.068-.611 1.004.071 1.532 1.032 1.532 1.032.893 1.53 2.34 1.088 2.91.832.091-.647.35-1.088.635-1.34-2.22-.252-4.555-1.112-4.555-4.944 0-1.092.39-1.985 1.03-2.682-.103-.253-.447-1.271.099-2.647 0 0 .84-.269 2.75 1.024A9.575 9.575 0 0 1 12 6.5c.85.004 1.705.115 2.505.338 1.91-1.293 2.75-1.024 2.75-1.024.546 1.376.202 2.394.1 2.647.642.697 1.03 1.59 1.03 2.682 0 3.842-2.338 4.687-4.566 4.935.36.309.68.92.68 1.856 0 1.34-.012 2.419-.012 2.747 0 .266.18.574.688.477C19.134 20.163 22 16.42 22 12c0-5.52-4.48-10-10-10z"
      clipRule="evenodd"
    />
  </svg>
);

export default GitHubIcon;
