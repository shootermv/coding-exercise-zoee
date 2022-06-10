# Coding exercise - Asset list 

## General guidelines
- Relax, if you receive this home assignment it means that we're excited about the idea to get you on board and we're convinced that you have the right skills to solve this task.
- Keep it simple! And be ready to explain your choices.
- Prefer something small that works great over a complete but unstable solution.
- Asking questions to clarify requirements will not have a negative impact on your evaluation, probably the opposite!
- Don't forget to cover your code with tests
- Write code that you're proud of!

We'll appreciate a notification by email when you actually start writing your first line of code, and a link to your repo when you're done. Feel free to ask questions if something is not clear.

## Technical considerations

- You can use this repo (a simple CRA project) as a starting point or create your own, up to you.
- Using React and Typescript is a strict requirement
- Don't worry about old browser support, running correctly in Chrome is enough for this exercise

## Your goal

Your application should present a list of assets (Stocks & Currencies) including real time price update, and allow users to filter this asset list.

An Asset is represented by this interface :
```ts
interface Asset {
	id: number;
	assetName: string; // The asset name, like "AAPL" for Apple stock or "EUR" for Euro Currency
	price: number; // asset current price (in USD)
	lastUpdate: number; // timestamp
	type: "Currency" | "Stock"; // asset type Currency (e.g. USD, EUR...) or Stock (Samsung, Google)
	market?: string; // for stock asset only
}
```

## Given data stream
You'll find a `data.ts` file under the source folder. Consider the default export of this file as an external service (you should not change anything there).

The data file export an [rxjs observable](https://rxjs.dev/guide/observable). You can subscribe to this stream from your react application to get data.

Subscribing to the data stream, you will receive Assets like this :

The data mocked in `data.ts` includes 200 Stocks and 200 Currency assets, and will emit price update for each of them every 200ms (simulating real time trading data).

To see actual data emitted by the stream, you can run `npm test` (the test included in `data.test.ts` will subscribe to the stream and emit 1 second of data).

## Requirements

### Asset List
- When page loads, the asset list should display all available assets
- For each asset in the list you should display
  - Asset type
	- Asset market (only for Stock)
  - Asset name
  - Asset price (real time is crucial in trading, you should always display the latest price available for each asset without any delay)

### Filtering the asset list
- User should be able to filter the list by asset type (All assets, Currency, Stock)
- User should be able to filter the list by typing some asset name (or part of it)

### UX Considerations
There is no strict guideline or recommendation for UX but this is definitely part of the exercise.
- You're more than welcome to show your skills with a creative, smooth and efficient user experience
- We use the term "asset list" in all requirements, but keep in mind that this list can be implemented as a table, as cards or any other component that you will find relevant
- If you're not inspired, get some ideas on modern trading platforms ([Google Finance](https://www.google.com/finance/), [Binance](https://www.binance.com/en/markets), ...)

## Bonus
- Make filters persistent so if user closes the app and comes back later he will still see the filtered asset list

## Getting Started

Run `npm install`.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.
