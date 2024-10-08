<div align="center">
  <h3>Embed 🔭</h3>
  <p>A lightweight and stable Discord user-bot</p>
  <img alt="License: OWL v1" src="https://img.shields.io/badge/License-OWLv1-blue.svg">
  <img alt="Uses TypeScript" src="https://img.shields.io/badge/Uses-Typescript-blue?logo=typescript">
  <img alt="Open Issues" src="https://img.shields.io/github/issues/lilyvxv/embed?label=Issues">
</div>

### Highlights

- Stable and lightweight
- Easy to install and use
- Modular making it easy to add new replacements

### Installation

> [!CAUTION]
> Embed is a user bot, and user bots are against Discord's terms of service. Use at your own risk.

#### : Prerequisites

- Recent versions of [Node.js](https://nodejs.org) & [npm](https://npmjs.com)
- Your Discord token

#### : Manual Installation

1. Get the latest release from the [Releases Page](https://github.com/lilyvxv/embed/releases)
2. Extract the zip file
3. Install dependencies

```sh
npm install
```

4. Copy `config.example.toml` to `config.toml` and fill in the required fields
5. Start the bot

```sh
npm start
```

#### : Docker Installation

1. Build the Docker image

```sh
docker build -t embed-user-bot .
```

2. Run the Docker container

```sh
docker run --name embed-user-bot -d --restart=always -v $(pwd)/config.toml:/app/config.toml embed-user-bot
```

### License

This project is licensed under the OWL v1 license. See the [LICENSE](LICENSE) file for more information.
