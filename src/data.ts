import { interval, from } from 'rxjs';
import { mergeMap, map, startWith } from 'rxjs/operators';

type AssetType = 'Stock' | 'Currency';

interface Asset {
	id: number;
	assetName: string; // The asset name, like "AAPL" for Apple stock or "EUR" for Euro Currency
	price: number; // asset current price (in USD)
	lastUpdate: number; // timestamp
	type: AssetType; // asset type Currency (e.g. USD, EUR...) or Stock (Samsung, Google)
  market?: string; // for stock asset only
}

function hashCode(s: string) {
    var text = "";
    var possible = "ABCDEFGHJKL";

    for (var i = 0; i < s.length; i++)
        text += possible.charAt(s.charCodeAt(i)-48);

    return text;
}
const createAsset = (assetId: number, assetType: AssetType): Asset => {
  return {
    id: assetId,
    assetName: hashCode(assetId.toString()) + (assetType === 'Currency' ? '/USD' : ''),
    price: Math.random()*10 + 7,
    lastUpdate: Date.now(),
    type: assetType,
    ...(assetType === 'Stock' && { market: ['Nasdaq','Euronext','London'][Math.floor(Math.random() * 2)] })
  }
};

const getAllAssets = (n: number) => {
  const result = [];
  for (let i = 10000; i < 10000 + n; i++) {
    result.push(createAsset(i, 'Stock'));
    result.push(createAsset(i+n, 'Currency'));
  }
  return result;
};

const NUMBER_OF_ASSETS = 200;
const INTERVAL = 200;

const assets = getAllAssets(NUMBER_OF_ASSETS);

const dataStream = interval(INTERVAL)
  .pipe(
    startWith(0),
    mergeMap(
      () => from(assets)
        .pipe(
          map(val => {
            const random = Math.random();
            val.price = random >= 0.5 ? val.price + random : val.price - random;
            val.lastUpdate = Date.now();
            return val;
          })
        )
    )
  );


export default dataStream;
