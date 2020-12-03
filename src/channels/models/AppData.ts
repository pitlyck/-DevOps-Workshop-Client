export interface AppData {
  readonly id?: Uuid;
  readonly customData: AppCustomData;
}

export type AppCustomData = {
  readonly channelsOrder: Uuid[];
};
