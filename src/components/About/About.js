import React from "react";
import ReactMarkdown from 'react-markdown';
import "./About.style.css";
import content from "./about.md";

const About = () => {
    //Creats a react hook that can set the content for the markdown
    const [markdown, setMarkdown] = React.useState("");

    //fetches our markdown form our about.md file, and sets the react hooks variable
    fetch(content).then(res => res.text()).then(text => setMarkdown(text));

    return (
        <div className="about-content">
            <ReactMarkdown source={markdown} />
        </div>
    )
}

export default About;