export interface DataType {
		percentage: any;
    name: string;
    value: number;
  }

export interface ProfitDataType {
  name: string;
  KIW: number;
  TS: number;
  DKK: number;
  TKR: number;
  KC: number;
  CT: number;
}

export interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  index: number;
  payload: DataType;
}
