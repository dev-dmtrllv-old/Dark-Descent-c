import React from "react";
import { toSnakeCase } from "./string";

export const getClassFromProps = (cn: string, { className, ...props }: { [key: string]: any } = {}) =>
{
	cn = toSnakeCase(cn);
	for (const prop in props)
	{
		if (props[prop] === true)
			cn += ` ${toSnakeCase(prop)}`;
		else if (typeof props[prop] === "string")
			cn += ` ${toSnakeCase(prop)}-${toSnakeCase(props[prop])}`;
	}
	return className ? `${className} ${cn}` : cn;
}

export const stopMouseEvents = (e: React.MouseEvent) =>
{
	e.preventDefault();
	e.stopPropagation();
}
