{-# LANGUAGE TemplateHaskell #-}

module Main where

import Data.FileEmbed (embedStringFile)
import System.Directory (getCurrentDirectory)
import System.FilePath (takeBaseName)
import System.Process (runCommand)
import Text.Printf (printf)

packageJson :: String
packageJson = $(embedStringFile "package.json")

main :: IO ()
main = do
  currectDirectory <- getCurrentDirectory
  let directoryName = takeBaseName currectDirectory
  writeFile "package.json" $ printf packageJson directoryName
  runCommand "pnpm i -D prettier @types/node typescript tsx"
  pure ()
