import React from "react"

interface props {
    children: React.ReactNode;
}

const Container: React.FC<props> = ({ children }) => {
    return <div className="container mx-auto px-5">{children}</div>
}

export default Container