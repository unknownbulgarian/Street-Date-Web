# StreetDate Introduction

Welcome to the **official documentation** of the Online Street Date.

Only maintained by one person, you will find all the information about the app here. Online Street Date gives you the opportunity to find a date in seconds. I can promise you one thing: this platform is not profit-oriented. Have fun with the simplest dating!

<img src="https://i.postimg.cc/SNdjmtVM/Screenshot-20.png" width="1200">

## Explore StreetDate Features

StreetDate was meant to be free and never chargeable, but to have successful dates you should know our features and how they work.

> [!WARNING]
> Limits

- You should know that as an unauthenticated user you have game limits, which means that your IP will be blacklisted if you reach this limit. Guests have 15 games per day !
  
- The Showcase Photo can be maximum 10 MB

- The old Showcase Photo will be removed from our database if you change it

> [!NOTE]
> Game Features

- You are able to skip the User
  
- You don't have to give your instagram at the end

- The game have no time limit

- You are able to know if the user have left

- You are able to ask 3 questions

> [!NOTE]
> Authenticated Features

- You are able to change your Profile Information

- You have own dashboard

- Every finished game is saved

- You can share your game

- You have shareable Stats Page

- You receive Notifications (likes,comments ...)

- You can share your finished Games

- You are able to remove comments from your published Posts

- You are able to remove your published Post

- You are able to change the Post Title

 - You are able to add reactions

 - You are able to comment

## Tutorial 

### How can I play ?

You can play the game as a guest, i.e. no registration is required. Please note that guests only have a limited number of games per day.

### For Guests

- Visit the Try Page
  
- Enter your Username (1 - 15 characters)
  
- Enter your Gender (If Male search = Female, If Female search - Male, if Other search Other)
  
- Enter your Instagram(It should be real and yours)
  
- Upload your own photo (It should be a image of you.. selfie .. )

  ### For Authenticated Users

- Visit the Play Page
  
- You will need to provide Gender, Instagram and a Showcase Photo in the Settings in order to Play

- Simply click on the Play Button

  <img src="https://i.postimg.cc/jSFZDcv8/Screenshot-17.png" width="800">


  ## Future

  Find out more about the new functions that will be added in the future

  ### React Native

  The app will soon be available for both IOS and ANDROID.

  - The servers will not be changed, i.e. you can also play with browser users.
 
  ### Discord DEV

  We are working on our own Discord bot so that you can also play our game in Discord.

  - We will use seperated servers probably, for optimizations.
 
  ### Invite Function

  We are working on the invite functionality, and it will be soon released.

  ### More Gamemodes

  As you know, this game can be played than more people in once, we will soon add double Date. ( 4 Persons )

  ### Report Function

  Soon report function will be added to our App, so you can avoid Trolls.

  - With the report function, ban functionality will also be added.

## What is StreetDate ?

This became very popular in Germany. Basically, two people cannot see each other until they have answered the other person's three questions. In the end, they can see each other and must say if they are interested in the other.

### Who started it ?

Blind dates originally came from America. It was mostly the big YouTube content creators who started it. But the blind dates usually took place in special studios and people had to apply for them. After a while, people in Germany started arranging blind dates on the street.

There was one thing I never understood, why nobody did this thing online.

## For Nerds 🤓

For a smoother experience, I used logic on the client side most of the time.

So basically lets say I got the addLike function to increase the total likes of the posts, I would have to pull up the back end to get the likes for the targeted posts

But why should I get every single like again? Instead, I first render everything on the client with client-side functions, so if someone likes it, it will call the addLocalLike function, so that way I don't need to pull all the likes again on the back end.



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
