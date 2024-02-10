/**
    * @typedef Skill
    * @prop {string} name
    * @prop {number} xp
    
    * @typedef SkillGroup
    * @prop {string} name
    * @prop {Skill[]} items

    * @typedef Link
    * @prop {string} name
    * @prop {string} url

    * @typedef Experience
    * @prop {string} name
    * @prop {string} position
    * @prop {string} date
    * @prop {string} description
    * @prop {Link[]} links

    * @typedef ExperienceGroup
    * @prop {string} name
    * @prop {Experience[]} items
 */

/** @type {SkillGroup[]} */
const skillGroups = [
    {
        name: "Languages",
        items: [
            { name: "Javascript", xp: 0.8 },
            { name: "Typescript", xp: 0.8 },
            { name: "HTML/CSS", xp: 0.8 },
            { name: "Go", xp: 0.4 },
            { name: "PHP", xp: 0.5 },
            { name: "Python", xp: 0.7 },
            { name: "C", xp: 0.3 },
            { name: "Bash", xp: 0.7 },
            { name: "SQL", xp: 0.4 },
        ],
    },
    {
        name: "Frameworks and Libraries",
        items: [
            { name: "React", xp: 0.9 },
            { name: "NextJS", xp: 0.9 },
            { name: "SolidJS", xp: 0.7 },
            { name: "Svelte", xp: 0.6 },
            { name: "Templ", xp: 0.3 },
            { name: "HTMX", xp: 0.3 },
            { name: "Web Components", xp: 0.4 },
            { name: "GTK", xp: 0.6 },
            { name: "Tailwind CSS", xp: 0.7 },
            { name: "Material UI", xp: 0.7 },
        ],
    },
    {
        name: "Other",
        items: [
            { name: "Vite", xp: 1.0 },
            { name: "Webpack", xp: 0.8 },
            { name: "AWS", xp: 0.4 },
            { name: "Firebase", xp: 0.9 },
            { name: "Google Cloud Platform", xp: 0.7 },
            { name: "MySQL", xp: 0.5 },
            { name: "PostgreSQL", xp: 0.4 },
            { name: "SQLite", xp: 0.5 },
            { name: "Linux", xp: 1.0 },
            { name: "Git", xp: 1.0 },
        ],
    },
];

/** @type {ExperienceGroup[]} */
const experienceGroups = [
    {
        name: "Professional",
        items: [
            {
                name: "Fiverr and Upwork",
                position: "Web Developer",
                date: "2021 - Present",
                description:
                    "120+ web applications including browser extensions, websites and server-side tools",
                links: [
                    { name: "Fiverr profile", url: "https://www.fiverr.com/" },
                    { name: "Upwork profile", url: "https://www.upwork.com/" },
                ],
            },
            {
                name: "WriteGPT",
                position: "Backend Developer",
                date: "Jan - Apr 2023",
                description:
                    "An chrome extension that integrates the power of OpenAI's GPT-4 into the browser",
                links: [
                    {
                        name: "Website",
                        url: "https://writegpt.ai/",
                    },
                ],
            },
        ],
    },
    {
        name: "Open Source",
        items: [
            {
                name: "Media Controls",
                position: "Creator",
                date: "2021 - Present",
                description:
                    "An extension for the GNOME Desktop on Linux to control media playback that supports MPRIS",
                links: [
                    {
                        name: "Github",
                        url: "https://github.com/sakithb/media-controls",
                    },
                ],
            },
            {
                name: "Wallhub",
                position: "Creator",
                date: "2023 - Present",
                description:
                    "An extension for the GNOME Desktop on Linux to manage wallpapers",
                links: [
                    {
                        name: "Github",
                        url: "https://github.com/sakithb/wallhub",
                    },
                ],
            },
            {
                name: "Powersearch",
                position: "Creator",
                date: "2021 - Present",
                description:
                    "A search interface that combines search API from mutiple popular APIs",
                links: [
                    {
                        name: "Github",
                        url: "https://github.com/sakithb/power-search",
                    },
                    {
                        name: "Demo",
                        url: "https://powersearch.vercel.app",
                    },
                ],
            },
        ],
    },
];

class NavButtonElement extends HTMLButtonElement {
    static define() {
        customElements.define("nav-button", NavButtonElement, {
            extends: "button",
        });
    }

    constructor() {
        super();
        this.classList.add("nav-button");
    }

    connectedCallback() {
        this.addEventListener("click", () => {
            const event = new CustomEvent("nav-changed", {
                detail: { name: this.name },
            });

            window.dispatchEvent(event);
        });

        window.addEventListener("nav-changed", (/** @type {any} */ e) => {
            if (e.detail.name === this.name) {
                this.setAttribute("active", "");
            } else {
                this.removeAttribute("active");
            }
        });
    }
}

class SkillsContentElement extends HTMLElement {
    static define() {
        customElements.define("skills-content", SkillsContentElement);
    }

    constructor() {
        super();
        this.classList.add("nav-content");
    }

    onNavChanged(e) {
        if (e.detail.name === "skills") {
            this.scrollIntoView({ behavior: "smooth" });
        }
    }

    connectedCallback() {
        window.addEventListener("nav-changed", this.onNavChanged.bind(this));

        const pillGroups = document.createElement("div");
        pillGroups.classList.add("pill-groups");

        for (const group of skillGroups) {
            const groupName = document.createElement("h2");
            groupName.textContent = group.name;

            const groupPills = document.createElement("div");
            groupPills.classList.add("pills");

            for (const item of group.items) {
                const pill = document.createElement("div");
                pill.classList.add("pill");

                let pillBg;
                let pillFg;

                if (item.xp < 0.5) {
                    pillBg = 60 + 20 * (item.xp * 2);
                    pillFg = 0;
                } else {
                    pillBg = 40 - 20 * (2 * item.xp - 1);
                    pillFg = 100;
                }

                pill.textContent = item.name;
                pill.style.backgroundColor = `hsl(0, 0%, ${Math.round(pillBg)}%)`;
                pill.style.color = `hsl(0, 0%, ${pillFg}%)`;
                pill.style.fontSize = `${1 + item.xp}em`;
                groupPills.appendChild(pill);
            }

            const groupElement = document.createElement("div");
            groupElement.classList.add("group");

            groupElement.appendChild(groupName);
            groupElement.appendChild(groupPills);
            pillGroups.appendChild(groupElement);
        }

        this.appendChild(pillGroups);
    }

    disconnectedCallback() {
        window.removeEventListener("nav-changed", this.onNavChanged.bind(this));
    }
}

class ExperienceContentElement extends HTMLElement {
    static define() {
        customElements.define("experience-content", ExperienceContentElement);
    }

    constructor() {
        super();
        this.classList.add("nav-content");
    }

    onNavChanged(e) {
        if (e.detail.name === "experience") {
            this.scrollIntoView({ behavior: "smooth" });
        }
    }

    connectedCallback() {
        window.addEventListener("nav-changed", this.onNavChanged.bind(this));

        const xpGroups = document.createElement("div");
        xpGroups.classList.add("xp-groups");

        for (const group of experienceGroups) {
            const groupName = document.createElement("h2");
            groupName.textContent = group.name;

            const groupXps = document.createElement("div");
            groupXps.classList.add("xps");

            for (const item of group.items) {
                const xp = document.createElement("div");
                xp.classList.add("xp");

                const xpName = document.createElement("h3");
                xpName.textContent = item.name;

                const xpPosition = document.createElement("span");
                xpPosition.classList.add("position");
                xpPosition.textContent = item.position;

                const xpDate = document.createElement("span");
                xpDate.classList.add("date");
                xpDate.textContent = item.date;

                const xpDescription = document.createElement("p");
                xpDescription.classList.add("description");
                xpDescription.textContent = item.description;

                const xpLinks = document.createElement("div");
                xpLinks.classList.add("links");

                for (const link of item.links) {
                    const xpLink = document.createElement("a");
                    xpLink.href = link.url;
                    xpLink.textContent = link.name;
                    xpLink.target = "_blank";

                    xpLinks.appendChild(xpLink);
                }

                xp.appendChild(xpName);
                xp.appendChild(xpPosition);
                xp.appendChild(xpDate);
                xp.appendChild(xpDescription);
                xp.appendChild(xpLinks);
                groupXps.appendChild(xp);
            }

            const groupElement = document.createElement("div");
            groupElement.classList.add("group");

            groupElement.appendChild(groupName);
            groupElement.appendChild(groupXps);
            xpGroups.appendChild(groupElement);
        }

        this.appendChild(xpGroups);
    }

    disconnectedCallback() {
        window.removeEventListener("nav-changed", this.onNavChanged.bind(this));
    }
}

NavButtonElement.define();
SkillsContentElement.define();
ExperienceContentElement.define();
