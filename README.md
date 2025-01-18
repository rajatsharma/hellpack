<h1 align="center">Hellpack 🔥</h1>
<h5 align="center">Getting started with Typescript application in seconds!</h5>

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
  rev = "97b1d17d8f840f5f1bc14dd0ece697de5b398040";
};
```

## Usage

Run this in the project directory

```sh
hellpack
```

## 📝 License

Read License [here](https://github.com/rajatsharma/hellpack/blob/master/LICENSE).
