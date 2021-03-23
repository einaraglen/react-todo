import React from "react";
import ReactMarkdown from 'react-markdown';
import "./About.style.css";
import content from "./about.md";

const About = () => {

    const [markdown, setMarkdown] = React.useState("");

    fetch(content).then(res => res.text()).then(text => setMarkdown(text));

    return (
        <div className="about-content">
            <ReactMarkdown source={markdown} />
        </div>
    )
}

export default About;