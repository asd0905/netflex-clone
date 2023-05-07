import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { RecoilRoot } from "recoil";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    outline: none;
    list-style: none;;
  }
`;

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<RecoilRoot>
				<ThemeProvider theme={theme}>
					<GlobalStyle />
					<App />
				</ThemeProvider>
			</RecoilRoot>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
