import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import { changeLanguage, isSupportedLanguageKey, languages } from "./i18n";
import logo from "./logo.svg";

function App() {
  const { t, i18n } = useTranslation();

  function handleChangeAppLanguage(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    if (isSupportedLanguageKey(value)) {
      changeLanguage(value);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <h1>{t("common.app.title")}</h1>

        <div>
          <select value={i18n.language} onChange={handleChangeAppLanguage}>
            {Object.entries(languages).map(([value, label], index) => (
              <option key={index} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </header>
    </div>
  );
}

export default App;
