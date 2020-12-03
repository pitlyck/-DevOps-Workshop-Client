import * as Immutable from 'immutable';
import { Record } from 'immutable';

interface IMessagePopularityData {
  readonly likes: Immutable.Set<Uuid>;
  readonly dislikes: Immutable.Set<Uuid>;
}

export interface IMessagePopularity extends IMessagePopularityData, IRecordFunctions<IMessagePopularityData, IMessagePopularity> {
}

const popularityRecordData: IMessagePopularityData = {
  likes: Immutable.Set<Uuid>(),
  dislikes: Immutable.Set<Uuid>(),
};

export class MessagePopularity extends Record(popularityRecordData) implements IMessagePopularity {
  readonly likes: Immutable.Set<Uuid>;
  readonly dislikes: Immutable.Set<Uuid>;

  toObject(): IMessagePopularityData {
    return super.toObject() as IMessagePopularityData;
  }

  with(data: Partial<IMessagePopularityData>): IMessagePopularity {
    return super.merge(data) as MessagePopularity;
  }
}
