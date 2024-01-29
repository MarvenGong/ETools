export interface IAsync {
    wait: (timestamp: number) => void;
}
declare const async: IAsync;
export default async;
