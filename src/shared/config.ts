export interface IConfig {
  readonly url: string;
}

let config: IConfig = {
  url: '',
};

export const setConfig = (newConfig: IConfig) => {
  config = newConfig;
};

export const getConfig = () => config;
