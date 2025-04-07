import {css} from "@emotion/react";
import {Outlet} from "react-router";

const container = css`
    height: 100dvh;
    width: 100%;
`;

export function Layout() {
    return (
        <div css={container}>
            <Outlet />
        </div>
    );
}
