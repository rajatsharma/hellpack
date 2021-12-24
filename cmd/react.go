package cmd

import (
	_ "embed"
	"os/exec"

	"github.com/spf13/cobra"
)

// reactCmd represents the react command
var reactCmd = &cobra.Command{
	Use:   "react",
	Short: "Generate .eslintrc and tsconfig for a React project",
	Run: func(cmd *cobra.Command, args []string) {
		generate("react")
		out, err := exec.Command("yarn", "add", "-D", "eslint", "eslint-config-prettier", "eslint-plugin-import", "eslint-plugin-prettier", "typescript", "prettier", "eslint-plugin-react-hooks", "eslint-plugin-jsx-a11y", "eslint-plugin-react").Output()
		check(err)
		println(string(out))
	},
}

func init() {
	rootCmd.AddCommand(reactCmd)
}
