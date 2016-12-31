export default function (place) {
  const {
    name,
    international_phone_number,
    formatted_address,
    opening_hours,
    website,
    url
  } = place;

  let formattedHours = '';
  if (opening_hours && opening_hours.weekday_text) {
    formattedHours = '# Hours \n';

    const hours = opening_hours.weekday_text
      .map((day) => `- ${day}`)
      .join('\n');

    formattedHours += hours;
  }

  return [
    `# General`,
    `Address: ${formatted_address}`,
    `Telephone: ${international_phone_number}`,
    `Website: ${website}`,
    `Map: ${url}`,
    `${formattedHours}`
  ].join('\n');
}
