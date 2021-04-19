import {
  BackendModule,
  InitOptions,
  ReadCallback,
  Services,
  TOptions,
} from "i18next";
import ky from "ky";

const I18N_URL = process.env.REACT_APP_I18N_URL;
if (!I18N_URL) {
  throw new Error("Mandatory env variable 'REACT_APP_I18N_URL'");
}
export class HttpBackendModule implements BackendModule {
  type = "backend" as any;

  services?: Services;
  backendOptions?: TOptions;
  i18nextOptions?: InitOptions;

  init(
    services: Services,
    backendOptions: TOptions,
    i18nextOptions: InitOptions
  ) {
    this.services = services;
    this.backendOptions = backendOptions;
    this.i18nextOptions = i18nextOptions;
  }

  async read(language: string, namespace: string, callback: ReadCallback) {
    try {
      const response = await ky.get(`${I18N_URL}/${language}`);
      const translations = await response.json();
      const lang = translations[namespace];
      callback(null, lang);
    } catch (error) {
      callback(error, null);
    }
  }
}
