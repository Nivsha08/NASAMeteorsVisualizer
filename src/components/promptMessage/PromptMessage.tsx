import React from "react";
import "./PromptMessage.scss";
import {Alert} from "antd";

interface PromptMessageProps {
    visible: boolean;
    onClose: () => void;
    message?: string;
    type?: "success" | "warning" | "error" | "info";
}

const PromptMessage = (props: PromptMessageProps) => ((
    <>
        {
            props.visible ?
                <Alert className="alert-message"
                       message={props.message}
                       type={props.type}
                       afterClose={props.onClose}
                       closable
                       showIcon/>
                : null
        }
    </>
));

export default PromptMessage;
