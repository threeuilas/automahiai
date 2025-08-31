Automahiʻai is a small farm management web app. The ʻai is not for AI, but is Hawaiian for food, or to eat.

## Getting Started

First, run the development server:

```bash
pnpm dev
```

The app will be hosted on [http://localhost:3000](http://localhost:3000). This command also starts Postgres in the background, and will shut it down on exit (CTRL+C).

### Postgres

Postgres is hosted in Docker. To start the database, use docker-compose:

```bash
docker-compose up -d
```

### ESLint Commands

- `pnpm lint` - Check for linting issues
- `pnpm lint:fix` - Automatically fix auto-fixable issues

### Database Migrations

This project uses Drizzle for ORM. Schema is stored in `./lib/db/schema`.

To migrate the database, change the schemas in `./lib/db/schema`, ensure the database is running, then generate and apply the migration:

```bash
$ pnpm generate
...
$ pnpm migrate
```

