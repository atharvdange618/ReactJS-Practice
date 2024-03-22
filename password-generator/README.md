# Password Generator App

## Overview

The Password Generator App is built using React and provides a simple and efficient way to create strong passwords with numbers and characters to enhance your online security.

## Features

- **Strong Password Generation**: Generate strong passwords with just a few clicks.
- **Enhanced Security**: Helps enhance your online security by creating complex passwords.
- **Copy to Clipboard**: Easily copy the generated password to your clipboard.

## Technologies Used

The app utilizes React and several React Hooks for its functionality:

- **React**: JavaScript library for building user interfaces.
- **useState**: Hook for managing state within functional components.
- **useCallback**: Hook to memoize functions and prevent unnecessary re-renders.
- **useEffect**: Hook for side effects like fetching data, setting up subscriptions, and manually changing the DOM.
- **useRef**: Hook to create a reference to the password input for copying to clipboard.

### Example: Password Generation Function

Here's an example of the `passGenerator` function used in the app:

```javascript
const passGenerator = useCallback(() => {
  let pass = '';
  let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  if (numAllowed) str += '0123456789';
  if (charAllowed) str += '~!@#$%^&*()_+}{][":?><`-';

  for (let i = 1; i <= length; i++) {
    let char = Math.floor(Math.random() * str.length);
    pass += str.charAt(char);
  }

  setPassword(pass);
}, [length, numAllowed, charAllowed, setPassword]);

```
### Example: Copy to Clipboard Function

Here's an example of the `copyToClipboard` function used in the app:

```javascript
const copyToClipboard = useCallback(() => {
  passRef.current?.select()
  passRef.current?.setSelectionRange(0, 20)
  window.navigator.clipboard.writeText(password)
}, [password])
```

## Installation

```bash
// Clone the repository
git clone https://github.com/atharvdange618/ReactJS-Practice.git

// Change the directory
cd password-generator

//Install the necessary dependencies
npm install

//Run the application
npm run dev
```

## Contribution

Your contributions and suggestions are welcome! Here's how you can contribute to this repository:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## Contact

If you have any questions or suggestions, please feel free to contact me:

- Email: [atharvdange.dev@gmail.com](mailto:atharvdange.dev@gmail.com)
- LinkedIn: [Atharv Dange](www.linkedin.com/in/atharvdange)
- Twitter: [@atharvdangedev](https://twitter.com/atharvdangedev)