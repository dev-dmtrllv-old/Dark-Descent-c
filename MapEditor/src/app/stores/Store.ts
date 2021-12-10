export abstract class Store {}

export abstract class InitializableStore<Props extends {}> extends Store
{
	protected abstract init: (props: Props) => void;
}

export type StoreType<T extends Store> = new (props: any) => T;

export type InitStoreType<T extends InitializableStore<any>> = new () => T;

export type InferStoreProps<T extends InitializableStore<any>> = T extends InitializableStore<infer P> ? P : never;
