export type CameraActionType = 'start' | 'stop' | 'init';
export enum CameraAction {
    START = 'start',
    STOP = 'stop',
    INIT = 'init'
}

export type CameraStateType = 'started' | 'stopped' | 'ready' | 'unknown';
export enum CameraState {
    STARTED = 'started',
    STOPPED = 'stopped',
    READY = 'ready',
    UNKNOWN = 'unknown'
}