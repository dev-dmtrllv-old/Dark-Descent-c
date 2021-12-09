import { makeObservable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { InferStoreProps, Store, StoreType } from "./Store";

export class RootStore
{
	private static readonly stores: Store<any>[] = [];

	public static init<T extends Store<any>>(type: StoreType<T>, props: InferStoreProps<T>)
	{
		let s = this.stores.find(s => s.constructor === type);
		if (!s)
		{
			s = new type(props);
			try
			{
				makeObservable(s!);
			}
			catch (e)
			{
				
			}
			this.stores.push(s!);
		}
	}

	public static get<T extends Store<any>>(type: StoreType<T>): T
	{
		let s = this.stores.find(s => s.constructor === type);
		if (!s)
			throw new Error(`Store ${type.name} is not initialized!`);
		return s! as T;
	}

	public static readonly use = <S extends Store<any>, P>(type: StoreType<S>, component: React.FC<P & { store: S }>) => 
	{
		const Component = observer(component);
		return ({ ...props }) => React.createElement(Component, { ...props, store: this.get(type) } as any);
	}
}
