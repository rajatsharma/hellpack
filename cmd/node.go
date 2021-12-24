package cmd

import (
	_ "embed"
	"os/exec"

	"github.com/spf13/cobra"
)

// reactCmd represents the react command
var nodeCmd = &cobra.Command{
	Use:   "node",
	Short: "Generate .eslintrc and tsconfig for a Node project",
	Run: func(cmd *cobra.Command, args []string) {
		generate("node")
		out, err := exec.Command("yarn", "add", "-D", "eslint", "eslint-config-prettier", "eslint-plugin-import", "eslint-plugin-prettier", "typescript", "prettier").Output()
		check(err)
		println(string(out))
	},
}

func init() {
	rootCmd.AddCommand(nodeCmd)
}
