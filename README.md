# noctisnova

The NoctisNova CLI suite. Run all your doctor tools from one command.

Built by [NoctisNova](https://noctisnova.com).

## Install & run

No install required:

```bash
npx noctisnova
```

Or jump straight to a specific tool:

```bash
npx noctisnova dead-doctor ./my-app
npx noctisnova auth-doctor --json
npx noctisnova orm-doctor ./my-app
npx noctisnova neat-doctor --tree
```

Global install (optional):

```bash
npm install -g noctisnova
noctisnova
```

## Tools included

| Tool | What it does |
|------|-------------|
| [dead-doctor](https://npmjs.com/package/dead-doctor) | Finds dead files, unused exports, zombie deps, commented blocks |
| [auth-doctor](https://npmjs.com/package/auth-doctor) | Detects auth vulnerabilities, unprotected routes, exposed secrets |
| [orm-doctor](https://npmjs.com/package/orm-doctor) | Spots N+1 queries, missing indexes, unsafe raw SQL, unbounded queries |
| [neat-doctor](https://npmjs.com/package/neat-doctor) | Analyses code structure, circular deps, god files, deep imports |

All tools target **TypeScript and Next.js** codebases and produce a scored health report (0–100).

## Requirements

- Node.js **18+**

## Links

- **Homepage:** https://noctisnova.com
- **Repository:** https://github.com/noctisnova/noctisnova-npm
- **Issues:** https://github.com/noctisnova/noctisnova-npm/issues

## License

MIT
