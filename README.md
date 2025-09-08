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

#### Note on NODE_OPTIONS for Drizzle CLI

The `pnpm generate` script automatically sets the environment variable:

```bash
NODE_OPTIONS='--conditions=react-server'
```

This is required because the Drizzle code uses `import 'server-only'`, which needs this Node.js option to resolve correctly in a CLI environment. You do not need to set this variable manually—it's handled by the script.

The `pnpm migrate` command does not import `server-only`, so it does not require this option.
