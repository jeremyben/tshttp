import ts from 'typescript'

export function listUnionLiterals<T extends string | number>(filePath: string, unionName: string) {
	const unions: Array<string | number> = []

	const program = ts.createProgram([filePath], {})
	const file = program.getSourceFile(program.getRootFileNames()[0])!
	const checker = program.getTypeChecker()

	file.forEachChild(visit)

	return unions as T[]

	function visit(node: ts.Node): ts.VisitResult<ts.Node> {
		const deeper = () => node.forEachChild(visit)

		if (!ts.isTypeNode(node)) return deeper()

		const type = checker.getTypeFromTypeNode(node)

		if (!type.isUnion() || checker.typeToString(type) !== unionName) return deeper()

		for (const type_ of type.types) {
			if (type_.isNumberLiteral() || type_.isStringLiteral()) {
				unions.push(type_.value)
			}
		}

		return deeper()
	}
}
