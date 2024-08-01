import Link from "next/link";
import { BugIcon, LightbulbIcon, PencilIcon } from "lucide-react";
import { getGitHubIssueUrl } from "@/lib/github";


export function Contribute() {
  const contributeLinks = [
    {
      text: "Report an issue",
      icon: BugIcon,
      href: getGitHubIssueUrl({
        owner: "yakkshit",
        repo: "ui",
        labels: ["bug", "documentation"],
        template: "bug_report.md",
      }),
    },
    {
      text: "Request a feature",
      icon: LightbulbIcon,
      href: getGitHubIssueUrl({
        owner: "yakkshit",
        repo: "ui",
        labels: ["enhancement"],
        template: "feature_request.md",
      }),
    },
    {
      text: "Edit this page",
      icon: PencilIcon,
      href: getGitHubIssueUrl({
        owner: "yakkshit",
        repo: "ui",
        labels: ["documentation"],
        template: "documentation.md",
      }),
    },
  ];

  return (
    <div className="space-y-2">
      <h1 className="font-medium">Contribute</h1>
      <ul className="m-0 list-none">
        {contributeLinks.map((link, index) => (
          <li key={index} className="mt-0 pt-2">
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <link.icon className="mr-2 size-2" />
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}