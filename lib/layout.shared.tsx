import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { gitConfig } from "./shared";
import { StoreIcon, UsersRoundIcon } from "lucide-react";

export function baseOptions(): BaseLayoutProps {
    return {
        nav: {
            title: (
                <span className="font-mono text-[#6dffb3]">
                    &gt; filo_studios
                </span>
            ),
        },
        themeSwitch: { enabled: false },
        githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
        links: [
            {
                icon: (
                    <img
                        src="/static/tebex-transparent.png"
                        width={22}
                        className="opacity-75 hover:opacity-100"
                    />
                ),
                text: "Store",
                url: `https://filo.tebex.io/`,
            },
            {
                icon: (
                    <img
                        src="/static/discord.png"
                        width={22}
                        className="opacity-75 hover:opacity-100"
                    />
                ),
                text: "Discord",
                url: `https://discord.gg/aTAU7hBdaa`,
            },
            {
                type: "icon",
                label: "Discord",
                icon: (
                    <img
                        src="/static/discord.png"
                        width={22}
                        className="opacity-75 hover:opacity-100"
                    />
                ),
                text: "Discord",
                url: "https://discord.gg/aTAU7hBdaa",
            },
            {
                type: "icon",
                label: "Tebex",
                icon: (
                    <img
                        src="/static/tebex-transparent.png"
                        width={22}
                        className="opacity-75 hover:opacity-100"
                    />
                ),
                text: "Tebex",
                url: "https://filo.tebex.io/",
            },
        ],
    };
}
