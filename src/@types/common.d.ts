type Uuid = string;

type Action = {
  type: string;
  payload?: any;
};

interface IRecordFunctions<TRecordData, TRecordFunctions> {
  // We can return the data of a record
  toObject: () => TRecordData;
  // We can merge the record data with other record data
  with: (data: Partial<TRecordData>) => TRecordFunctions & TRecordData;
}

/**
 * Type that ensures you do not forget to add a property to React.propTypes
 * when it is defined in IProps of the component.
 *
 * @type IProps component's props type
 */
declare module 'prop-type-shape' {
  import { Validator } from 'prop-types';
  global {
    type PropTypesShape<IProps> = {
      [P in keyof IProps]-?: Validator<any>;
    };
  }
}
