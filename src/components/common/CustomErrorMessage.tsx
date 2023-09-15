import React from "react";

type Props = {
    text: string;
}

const CustomErrorMessage = ({ text }: Props) => {
    return (
        <span style={{ fontSize: "14px", color: "red" }} role="alert">{text}</span>
    )
}

export default CustomErrorMessage;