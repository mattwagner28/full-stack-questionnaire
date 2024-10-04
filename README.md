## About
This is a demo app of a full stack intake form for a telehealth company. After logging in, users can choose from three questionnaires to fill out based on the product of their interest. Once they complete and submit the questionnaire, the data is saved to a database, and they are once agaim redirected to the questionnaire options. If they choose to fill out another questionnaire, questions they already answered will be pre-populated from their most recent answers found in the database. If they redo a questionnaire already submitted, then their answers will be updated in the database for that questionnaire. 

By logging in as 'admin', all questionnaire data per user can be viewed in the Admin Panel. The Admin Panel displays a list of users who have submitted questionnaires. Admin can click on a user's username to see a list of questionnaires they submitted. When a questionnaire is clicked, it will display the user's answers in a question and answer format. 

## Getting started/logging in
Any user can choose a username and login with whatever password they choose. For the sake of this demonstration, any password will work at any time. Usernames and passwords will be saved, but passwords will simply just update if it is a different password than before to simplify logging in.

To view the admin panel, login as 'admin' and choose any password. 

## Deployoment link

https://full-stack-questionnaire.vercel.app/

App is deployed using Vercel. The database is deployed and hosted through Render. 

## Tech stack used
Next.js, PostgreSQL, Tailwind CSS. 

## User Demo
[Untitled Video October 4, 2024 11_16 AM.webm](https://github.com/user-attachments/assets/426f49d8-a5be-470c-825f-dac5c1402dec)

## Admin Panel Demo
[Untitled Video October 4, 2024 11_20 AM.webm](https://github.com/user-attachments/assets/695398e3-1c9e-4b97-97ad-9bdfcc5929b3)


## To run locally

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

