export type KeysOf<T extends Record<string, any>> = keyof T;

export type ValuesOf<T extends Record<string, any>> = T[keyof T];
