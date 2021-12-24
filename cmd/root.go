package cmd

import (
	"os"

	"github.com/gobuffalo/packr/v2"
	"github.com/spf13/cobra"
)

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "hellpack",
	Short: "🔥From 0 to eslint, real quick!",
	Long:  `Generates .eslint file according to your project and installs required dependencies.`,
	// Uncomment the following line if your bare application
	// has an action associated with it:
	// Run: func(cmd *cobra.Command, args []string) { },
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

func check(err error) {
	if err != nil {
		panic(err)
	}
}

func generate(project string) {
	box := packr.New("Configs", "../configs")
	eslintrc, err := box.Find("eslintrc." + project + ".json")
	check(err)
	tsconfig, err := box.Find("tsconfig.json")
	check(err)
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
