# Learn NLW2 Proffy

## Requirements

- [NodeJS](https://nodejs.org/)
- [expo-cli](https://expo.io/) globally (`npm i -g expo-cli`)

## Install

- `npm ci` in each folder (`api`, `web` and `mobile`)

## Development

### API

- `cd api && npm run dev`

- or simply `docker-compose up api`

### Web

- `cd web`
- Create a `.env` file and copy the contents of `.env.default` to it
- `npm start`

- or simply `docker-compose up web`

### Mobile

- `npm start`

https://github.com/Rocketseat/expo-common-issues

## API Connections

- GET `/connections`: List the total of connections made untill the time of request
  - Request: *--empty--*
  - Response: `{ total: [number] }`

- POST `/connections`: Creates a new connection
  - Request: `{ user_id: [number] }`
  - Response: *--empty--*

### Classes

- POST `/classes`: Creates a new class
  - Request:
    ```
    {
      name: [string],
      avatar: [string],
      whatsapp: [string],
      bio: [string],
      subject: [string],
      cost: [float],
      schedule: [{
        week_day: [number],
        from: [number],
        to: [number]
      }]
    }
    ```
  - Response: *--empty--*

- GET `/classes`: List classes (can be filtered by subject, week day and schedule)
  - Request:
    ```
    {
      filters: {
        week_day: [string],
        time: [string],
        subject: [string]
      }
    }
    ```
  - Response:
    ```
    {
      id: [number],
      subject: [string],
      cost: [number],
      user_id: [number],
      name: [string],
      avatar: [string],
      whatsapp: [string],
      bio: [string]
    }
    ```

## TODO

* Implement version 2.0
* Refactor CSS (may use sass or less?)
* Refactor mobile styles (better naming and so)