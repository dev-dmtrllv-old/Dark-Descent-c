export class Store<Props>
{
	public readonly props: Readonly<Props>;

	public constructor(props: Props)
	{
		this.props = props as any;
	}
}

export type StoreType<T extends Store<any>> = new (props: any) => T;

export type InferStoreProps<T> = T extends Store<infer P> ? P : never;
