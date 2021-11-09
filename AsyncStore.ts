
import { action, makeObservable,observable } from 'mobx';

import { AsyncStatus } from '../models/AsyncStatus';

/**
 * Class representing Async Store that provides
 * functionality for tracking asynchronous status
 * @class
 */
export class AsyncStore {
    public asyncStatusMap: Map<string, AsyncStatus> = new Map();
    constructor() {
        makeObservable(this, {
            asyncStatusMap: observable,
            setLoading: action.bound,
            setSuccess: action.bound,
            setError: action.bound,
            removeAsyncStatus: action.bound,
        });
    }

    public getAsyncStatus = (key: string): AsyncStatus => {
        return this.asyncStatusMap.get(key) || new AsyncStatus(false, false, false);
    }

    public removeAsyncStatus = (key: string): void => {
        this.asyncStatusMap.delete(key);
    }

    public setLoading(key: string): void {
        this.asyncStatusMap.set(key, new AsyncStatus(true, false, false));
    }

    public setSuccess(key: string): void {
        this.asyncStatusMap.set(key, new AsyncStatus(false, true, false));
    }

    public setError(key: string): void {
        this.asyncStatusMap.set(key, new AsyncStatus(false, false, true));
    }
}
