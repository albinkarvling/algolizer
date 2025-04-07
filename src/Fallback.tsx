import {css} from "@emotion/react";

const container = css`
    display: flex;
    height: 100dvh;
    width: 100vw;
`;
const sidebar = css`
    background-color: var(--background-primary-sidebar);
    width: var(--width-main-sidebar);
    min-width: var(--width-main-sidebar);
    padding: var(--main-padding);

    @media (max-width: 768px) {
        display: none;
    }
`;
const sidebarText = css`
    width: 120px;
    height: 14px;
    border-radius: 6px;
    background-color: var(--background-accent-sidebar);
    margin-bottom: 0.5rem;
`;
const sidebarDropdown = css`
    height: 43px;
    border-radius: 8px;
    background-color: var(--background-accent-sidebar);
`;
const content = css`
    width: 100%;
    height: 100%;
    background-color: var(--background-accent-sidebar);
`;
const header = css`
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--height-header);
    background-color: var(--background-primary-header);
    border-left: 1px solid var(--background-accent-header);
    color: var(--text-primary-header);
    padding: 1.25rem;
`;
const headerText = css`
    width: 140px;
    height: 22px;
    border-radius: 6px;
    background-color: var(--background-accent-sidebar);
`;

export function Fallback() {
    return (
        <div css={container} aria-busy>
            <div css={sidebar}>
                <div css={sidebarText} />
                <div css={sidebarDropdown} />
            </div>
            <div css={content}>
                <div css={header}>
                    <div css={headerText} />
                </div>
            </div>
        </div>
    );
}
