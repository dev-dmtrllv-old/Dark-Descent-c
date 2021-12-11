export class Storage<T extends StorageTypeMap>
{
	private static readonly storageCells: { [key: string]: Storage<any> } = {};

	public readonly typeMap: Readonly<T>;
	public readonly namespace: Readonly<string>;

	public constructor(namespace: string, typeMap: T)
	{
		if (Storage.storageCells[namespace])
			throw new Error(`Storage with namespace ${namespace} already`);

		this.typeMap = typeMap;
		this.namespace = namespace;

		Storage.storageCells[namespace] = this;
	}

	public get<K extends keyof T>(key: K): (CastType<T[K]> | null);
	public get<K extends keyof T>(key: K, defaultValue: CastType<T[K]>): CastType<T[K]>;
	public get<K extends keyof T>(key: K, defaultValue: CastType<T[K]> | null = null): CastType<T[K]> | null
	{
		const d = localStorage.getItem(`${this.namespace}.${key as string}`);
		if (!d)
		{
			this.set(key, defaultValue as any);
			return defaultValue;
		}
		return TYPE_CASTERS[this.typeMap[key]](d) as CastType<T[K]>;
	};

	public readonly set = <K extends keyof T>(key: K, data: CastType<T[K]>) => 
	{
		const cast = STRING_CASTERS[this.typeMap[key]] as any;
		localStorage.setItem(`${this.namespace}.${key as string}`, cast(data))
	};

	public readonly update = <K extends keyof T, C = CastType<T[K]>>(key: K, updater: (data: C | null) => C) =>
	{
		let oldData = this.get(key);
		const newData = updater(oldData as any);
		this.set(key, newData as any);
	}

	public readonly delete = <K extends keyof T>(key: K) => localStorage.removeItem(`${this.namespace}.${key as string}`);
}

const TYPE_CASTERS: TypeCasters = {
	array: (data) => JSON.parse(data),
	object: (data) => JSON.parse(data),
	number: (data) => Number(data),
	boolean: (data) => Boolean(data),
	string: (data) => data,
};

const STRING_CASTERS: StringCasters = {
	array: (data) => JSON.stringify(data),
	object: (data) => JSON.stringify(data),
	number: (data) => String(data),
	boolean: (data) => String(data),
	string: (data) => data,
};

type TypeMap = {
	array: Array<any>;
	object: Object;
	number: number;
	boolean: boolean;
	string: string;
};

type TypeMapKey = keyof TypeMap;

type StorageTypeMap = {
	[K: string]: TypeMapKey;
};

type CastType<K extends TypeMapKey> = TypeMap[K];

type TypeCasters = {
	[K in TypeMapKey]: (data: any) => TypeMap[K];
};

type StringCasters = {
	[K in TypeMapKey]: (data: TypeMap[K]) => string;
}
