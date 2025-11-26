# Installation

Install Rohas CLI and set up your development environment.

## Prerequisites

- **Rust 1.70+** - Install from [rustup.rs](https://rustup.rs)
- **Cargo** - Comes with Rust installation
- **Node.js 18+** (for TypeScript runtime) - Install from [nodejs.org](https://nodejs.org)
- **Python 3.9+** (for Python runtime) - Install from [python.org](https://python.org)

## Quick Install (Recommended)

The easiest way to install Rohas CLI with all dependencies:

```bash
curl -fsSL https://raw.githubusercontent.com/rohas-dev/rohas/main/scripts/build.sh | bash
```

This script will:
- Check and install required dependencies (Rust, Python, Node.js)
- Clone the repository
- Build the binary
- Install Rohas CLI to `/usr/local/bin/rohas`
- Optionally build and install the workbench

Verify the installation:

```bash
rohas --version
```

## Install via Cargo

Alternatively, install directly from Cargo:

```bash
cargo install rohas-cli
```

Verify the installation:

```bash
rohas --version
```

## Build from Source

Clone and build the repository:

```bash
git clone https://github.com/rohas-dev/rohas.git
cd rohas
cargo build --release -p rohas-cli
```

The binary will be in `target/release/rohas`

## Runtime Setup

### TypeScript/Node.js

For TypeScript projects, ensure Node.js 18+ is installed:

```bash
node --version  # Should be 18.0.0 or higher
npm install  # Install project dependencies
```

### Python

For Python projects, ensure Python 3.9+ is installed:

```bash
python --version  # Should be 3.9.0 or higher
pip install -r requirements.txt  # Install project dependencies
```

## Verify Installation

Run the following command to see all available commands:

```bash
rohas --help
```

