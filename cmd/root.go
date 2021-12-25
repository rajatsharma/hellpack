package cmd

import (
	"os"

	"github.com/spf13/cobra"
)

var tsconfig []byte
var reactEslintrc []byte
var nodeEslintrc []byte

func SetConfigs(staticTsconfig []byte, staticReactEslintrc []byte, staticNodeEslintrc []byte) {
	tsconfig = staticTsconfig
	reactEslintrc = staticReactEslintrc
	nodeEslintrc = staticNodeEslintrc
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "hellpack",
	Short: "🔥From 0 to eslint, real quick!",
	Long:  `Generates .eslint file according to your project and installs required dependencies.`,
	// Uncomment the following line if your bare application
	// has an action associated with it:
	// Run: func(cmd *cobra.Command, args []string) { },
}

func check(err error) {
	if err != nil {
		panic(err)
	}
}

func generate(project string) {
	var eslintrc []byte
	if project == "node" {
		eslintrc = nodeEslintrc
	} else {
		eslintrc = reactEslintrc
	}

	path, err := os.Getwd()
	check(err)
	check(os.WriteFile(path+"/.eslintrc", eslintrc, 0644))
	check(os.WriteFile(path+"/tsconfig.json", tsconfig, 0644))
}

func init() {
	// Here you will define your flags and configuration settings.
	// Cobra supports persistent flags, which, if defined here,
	// will be global for your application.

	// rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.hellpack.yaml)")

	// Cobra also supports local flags, which will only run
	// when this action is called directly.
	rootCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
