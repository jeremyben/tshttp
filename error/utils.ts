/**
 * Gives a class constructor the possibility to be invoked
 * with or without the `new` keyword, like built-in constructors.
 *
 * @param class_ class whose constructor will be proxified.
 * @param constructorName if we need an accurate `constructor.name` property.
 *
 * @internal
 */
export function makeNewOptional<C extends new (...args: any[]) => any>(class_: C, constructorName?: string) {
	type NoNew<T extends C> = (...args: ConstructorParameters<T>) => InstanceType<T>

	const proxy = new Proxy(class_, {
		apply(target, this_, args) {
			return new target(...args)
		},
	}) as (C & NoNew<C>)

	if (constructorName) Object.defineProperty(proxy, 'name', { value: constructorName })

	return proxy
}
