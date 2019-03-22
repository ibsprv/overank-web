import React, { Component } from "react";
// import { renderToStaticMarkup } from "react-dom/server";
import { Route, NavLink } from "react-router-dom";
import detectBrowserLanguage from "detect-browser-language";
import {
  withLocalize,
  Translate,
  LocalizeContextProps,
  onMissingTranslationFunction
} from "react-localize-redux";
import logo from "./logo.svg";
import "./App.css";
import Test from "./sections/Test";
import textTranslations from "./translations/translations.json";
import { Favorite } from "@material-ui/icons";
import Users from "./sections/Users";
import UsersRedux from "./sections/UsersRedux";
import TestRedux from "./sections/TestRedux";

const onMissingTranslation: onMissingTranslationFunction = opts => {
  // tslint:disable-next-line:no-console
  console.log("Missing Translation");
  return opts.languageCode;
};

class App extends Component<LocalizeContextProps> {
  constructor(props: LocalizeContextProps) {
    super(props);

    this.props.initialize({
      languages: [
        { name: "English", code: "en" },
        { name: "Deutsch", code: "de-DE" }
      ],
      translation: textTranslations,
      options: {
        renderToStaticMarkup: false,
        // renderInnerHtml: false,
        onMissingTranslation,
        defaultLanguage: "en"
      }
    });
    const lang = detectBrowserLanguage();
    // tslint:disable-next-line:no-console
    console.log(lang);
    this.props.setActiveLanguage(lang);
  }

  public componentDidMount() {
    this.setState({ userLanguage: detectBrowserLanguage() });
  }

  public render() {
    const { languages, activeLanguage, setActiveLanguage } = this.props;
    // tslint:disable-next-line:no-console
    console.log("App render", languages, activeLanguage);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <main>
            <nav>
              <NavLink to="/" activeClassName="active">
                Home
              </NavLink>
              <br />
              <NavLink to="/test" activeClassName="active">
                Get test text
              </NavLink>
              <br />
              <NavLink to="/test/redux" activeClassName="active">
                Test Redux
              </NavLink>
              <br />
              <NavLink to="/users" activeClassName="active">
                Get users selection
              </NavLink>
              <br />
              <NavLink to="/usersred" activeClassName="active">
                Get users redux selection
              </NavLink>
            </nav>

            <Route exact path="/test" component={Test} />
            <Route path="/test/redux" component={TestRedux} />
            <Route exact path="/users" component={Users} />
            <Route path="/user/:userId" component={Users} />
            <Route exact path="/usersred" component={UsersRedux} />
          </main>
          <p>
            With love to <Favorite />{" "}
            <code>TypeScript React Redux Material-UI</code>
          </p>
          <a
            className="App-link"
            href="https://ibsolution.de"
            target="_blank"
            rel="noopener noreferrer">
            <Translate id="greeting">Hallo</Translate>
          </a>
        </header>
      </div>
    );
  }
}

export default withLocalize(App);
