This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Functional Requirements

- [ ] Allow users to navigate in the text
- [ ] Allow users to have two modes -- Normal and Insert
- [ ] Support complex vim key strokes in normal Mode like `diw`
- [ ] Allow to store created notes -- only for Authenticated users
- [ ] Allow to see logged notes and pull up any of the written notes by date

## Bonus Requirements

- [ ] Create summary of notes using AI
- [ ] Add support for Visual Mode
- [ ] Allow to yank and paste text to/from clipboard
- [ ] Allow to UNDO changes, and REVERT changes
- [ ] Allow j/k to navigate within paragraphs, or perhaps add a special mode that enables such naviation

## TODO/BUGS:

- [ ] For Insert mode display cursor, one ahead of the current location
- [ ] Fix navigation from -1 to 0. Each naviation keystroke, should move the visible cursor
- [ ] When jumping from line to line
- [ ] for h/l disallow to jump across lines
