const csv = require('csv-parser');
const fs = require('fs');
const results = [];

fs.createReadStream('ISO_4217.csv')
  .pipe(csv())
  .on('data', data => results.push(data))
  .on('end', () => {
    const currencies = results.map(result => {
      const country = result['Para birimini kullanan ülkeler'];
      return {
        code: result['Kod'],
        number: parseInt(result['No']),
        name: result['Para birimi'],
        country: country?.toString().trim(),
      };
    });

    fs.writeFileSync('currencies.json', JSON.stringify(currencies));
  });
