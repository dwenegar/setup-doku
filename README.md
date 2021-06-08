# setup-lua

![build](https://github.com/dwenegar/setup-doku/workflows/build/badge.svg)

This action sets up Doku and DocFx.

## Usage

See [action.yml](action.yml)

Install the default version of Doku (0.3.1) and DocFx (2.57.2).

```yaml
- uses: dwenegar/setup-doku
```

Install specific version of Lua and LuaRocks:

```yaml
- uses: dwenegar/setup-doku
  with:
    doku-version: ...
    docfx-version: ...
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
