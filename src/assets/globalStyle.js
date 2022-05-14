import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        background-color: #FDFDFD;
    }

    :root {
        --main-color: #06070D;
    }

    .bookmark-icon {
        color: var(--main-color);
        margin-top: 6px;
        stroke-width: 0.6;
    }

    .user-icon {
        color: var(--main-color);
        margin-right: 12px;
    }

    .nav-active {
        color: var(--main-color);
    }
    .nav-inactive {
        color: var(--main-color);
        opacity: 0.7;
    }
`;

export default GlobalStyle;