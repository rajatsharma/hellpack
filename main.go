package main

import (
	_ "embed"

	"github.com/rajatsharma/hellpack/cmd"
)

//go:embed configs/tsconfig.json
var tsConfig []byte

//go:embed configs/eslintrc.react.json
var reactEslintrc []byte

//go:embed configs/eslintrc.node.json
var nodeEslintrc []byte

func main() {
	cmd.SetConfigs(tsConfig, reactEslintrc, nodeEslintrc)
	cmd.Execute()
}
