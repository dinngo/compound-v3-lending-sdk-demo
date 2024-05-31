# Compound-v3 Lending SDK Open Position Demo

This is a demo application that showcases the usage of the @protocolink/lending package. It demonstrates how to open a position by providing collateral on the Compound V3 lending protocol.

## Usage

- In the project directory, run the following command to start the demo: `yarn start`
- The demo will guide you through the process of opening a position on the Compound V3 lending protocol.
- Follow the prompts in the terminal and press Enter when instructed.
- The demo will output the necessary data for sending the transaction, including the estimated funds, balances, approvals, permit data, and fees.
- You can use the generated transaction request to send the transaction using your preferred method (e.g., a web3 provider or a wallet interface).

## Dependencies

- [@protocolink/api](https://github.com/dinngo/protocolink-js-sdk): The Protocolink API SDK for interacting.
- [@protocolink/common](https://github.com/dinngo/protocolink-js-sdk): Common utilities for Protocolink packages.
- [@protocolink/lending](https://github.com/dinngo/protocolink-js-sdk): The Protocolink Lending SDK, which provides adapters for various lending protocols.
- readline: A Node.js module for reading input from the terminal.
