# setup-lua

![build](https://github.com/dwenegar/setup-doku/workflows/build/badge.svg)

This action sets up Doku and DocFx.

## Usage

See [action.yml](action.yml)

Install the default version of Doku (1.1.0) and DocFx (2.67.2).

```yaml
- uses: dwenegar/setup-doku
```

Install specific version of Doku and DocFx:

```yaml
- uses: dwenegar/setup-doku
  with:
    doku-version: ...
    docfx-version: ...
```

## License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
