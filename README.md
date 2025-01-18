<h1 align="center">Hellpack 🔥</h1>
<h5 align="center">Getting started with Typescript application in seconds!</h5>

### Installation

```nix
db-up-derivation = ({ pkgs, package, rev, ghc }:
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
db-up = db-up-derivation {
  pkgs = pkgs;
  ghc = ghc;
  package = "hellpack";
  rev = "2dfa8c678b060ee686bbb522ca8bc8362b050b49";
};
```

## Usage

Run this in the project directory

```sh
hellpack
```

## 📝 License

Read License [here](https://github.com/rajatsharma/hellpack/blob/master/LICENSE).
