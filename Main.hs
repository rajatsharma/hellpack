{-# LANGUAGE BlockArguments #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE TemplateHaskell #-}

module Main where

import Control.Monad (when)
import Data.FileEmbed (embedStringFile)
import System.Directory (getCurrentDirectory)
import System.FilePath (takeBaseName)
import System.Process (runCommand)
import Text.Printf (printf)
import Turtle (Parser, options, switch)

packageJson :: String
packageJson = $(embedStringFile "package.json")

tsconfigJson :: String
tsconfigJson = $(embedStringFile "tsconfig.json")

parser :: Parser (Bool, Bool)
parser =
  (,)
    <$> switch "with-db" 'd' "Specify to install database packages"
    <*> switch "with-express" 'e' "Specify to install express packages"

main :: IO ()
main = do
  (withDb, withExpress) <- options "Hellpack" parser
  currectDirectory <- getCurrentDirectory
  let directoryName = takeBaseName currectDirectory
  writeFile "package.json" $ printf packageJson directoryName
  writeFile "tsconfig.json" tsconfigJson
  runCommand "pnpm i -D prettier @types/node typescript tsx"
  when withDb do
    runCommand "pnpm i slonik"
    runCommand "db-up"
    pure ()
  when withExpress do
    runCommand "pnpm i express"
    pure ()
