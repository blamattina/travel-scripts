# Travel Scripts
> Useful scripts for planning trips

## Setup

### Setup API Keys

- [Trello API Key]
- [Google API Console]

```
cp .env.example .env
vim .env
```

[Trello API Key]: https://trello.com/app-key
[Google API Console]: https://console.developers.google.com/apis/credentials

### Build and link

```
npm link
```

### Development

```
npm run create-travel-cards
```

## Scripts

### `create-trello-cards`

Create trello cards for tourist attractions that contain:

- Hours
- Address
- Telephone number
- Website
- Google Places Link
- Up to 10 photo attachments
