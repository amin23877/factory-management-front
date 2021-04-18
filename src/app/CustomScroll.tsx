import React from "react";
import Scrollbars, { ScrollbarProps } from "react-custom-scrollbars";

interface ICustomScorllbars extends ScrollbarProps {
    thumbColor?: string;
}

export default function CustomScrollbars(props: ICustomScorllbars) {
    const { thumbColor } = props;
    const renderThumb = ({ style, ...props }: any) => {
        const thumbStyle = {
            backgroundColor: thumbColor ? thumbColor : "rgba(255, 255, 255, 0.5)",
            borderRadius: 10,
        };
        return <div style={{ ...style, ...thumbStyle }} {...props} />;
    };

    return (
        <Scrollbars renderThumbVertical={renderThumb} {...props}>
            {props.children}
        </Scrollbars>
    );
}
