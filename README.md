<h1 align="center">Hellpack 🔥</h1>
<h5 align="center">Getting started with Typescript application in seconds!</h5>

> Note: This program is only meant for server or CLI applications, for frontend applications use [Vite](https://vite.dev/).

### Installation

```nix
hellpack-derivation = ({ pkgs, package, rev, ghc }:
  pkgs.stdenv.mkDerivation {
    name = "${package}";
    src = builtins.fetchGit {
      url = "git@github.com:rajatsharma/${package}";
      ref = "master";
      rev = rev;
    };
    buildPhase = ''
      ${ghc}/bin/ghc Main.hs
    '';
    installPhase = ''
      mkdir -p $out/bin
      cp -r ./Main $out/bin/${package}
    '';
  });
```

Call the function

```nix
hellpack = hellpack-derivation {
  pkgs = pkgs;
  ghc = ghc;
  package = "hellpack";
  rev = "fe703b81e385ac276365dbf5e9dc3cacfdf5fad8";
};
```

## Usage

Run this in the project directory

```sh
hellpack
```

## 📝 License

Read License [here](https://github.com/rajatsharma/hellpack/blob/master/LICENSE).
