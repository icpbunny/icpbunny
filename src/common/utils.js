const isDebug = true;

export function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
    : '0';
}

export function isVowel(s) {
  return /^[aeiou]$/i.test(s);
}

export function log(message) {
  if (isDebug) {
    console.log(message);
  }
}

export const sliceAddress = (address, slicePoint = 5) => (
  <>
    {address?.slice(0, slicePoint)}
    ...
    {address?.slice(address.length - slicePoint, address.length)}
  </>
);

export const sliceSentence = (address, slicePoint = 45) => (
  <>
    {address?.slice(0, slicePoint)}...
  </>
);

export function formatDate(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp / 1000000);

  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();

  var time = date + '/' + month + '/' + year;

  log(time);
  return time;
}

export function formatPropertiesLabel(label) {
  let result = label;

  switch (label) {
    case 'BreedingCapacity':
      result = 'Breeding Capacity';
      break;

    case 'LifeSpan':
      result = 'Life Span';
      break;

    case 'EarningCapacity':
      result = 'Earning Capacity';
      break;

    case '3D_Breedable':
      result = '3D Breedable';
      break;

    case 'ThreeD_Breedable':
      result = '3D Breedable';
      break;

    default:
      break;
  }

  return result;
}
