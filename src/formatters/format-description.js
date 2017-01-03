export default function (place) {
  const {
    internationalPhoneNumber,
    formattedAddress,
    openingHours,
    website,
    url,
  } = place;

  let formattedHours = '';
  if (openingHours && openingHours.weekdayText) {
    formattedHours = '# Hours \n';

    const hours = openingHours.weekdayText
      .map(day => `- ${day}`)
      .join('\n');

    formattedHours += hours;
  }

  return [
    '# General',
    `Address: ${formattedAddress}`,
    `Telephone: ${internationalPhoneNumber}`,
    `Website: ${website}`,
    `Map: ${url}`,
    `${formattedHours}`,
  ].join('\n');
}
