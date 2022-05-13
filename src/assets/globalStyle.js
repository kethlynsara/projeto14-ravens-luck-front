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
`;

export default GlobalStyle;