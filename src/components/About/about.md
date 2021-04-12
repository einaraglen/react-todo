## About
This Website is written in JavaScript using the React Framework.

It works by using a setting up a context of data, based on the session data from the browser. If the user has visited the site before and the browser has saved the data, it will be displayed.

This is a primitive way of serializing the user data in the browser.

### How-To :

1. **Add** by clicking the plus symbol top-left corner
    - This will display the add-version of the modal
    - Here a title can be set together with a short description of the Task 
    - After everything looks good the Add button can be pressed to creat the new Task

2. **Proceed** Task to next state
    - Click the double arrow at the bottom of the task to send into the next state
    - This all is persistant and will changes are saved in the browser

3. **Editing** is done by clicking the pencil icon
    - Here we will be meet by the edit-version of the modal.
    - We can now choose to edit the title or the description of the task.
    - Additionally we can also change it to what ever state we want it to be
    - And at the very bottom we can either save our changes or delete the task completely

----

### Tools used :

ToolTips and RadioButtons are used from the **`material-ui`** library, a UI library i will continue to use.
 - [Material-UI](https://material-ui.com/)

 The about page is created by using the **`react-markdown`** library for reading markdown files into HTML.
 - [Markdown Library](https://www.npmjs.com/package/react-markdown)

For the modal i went with **`react-modal`**, I could have used Material-UI's modal, but i went with a more light weight one.
 - [Modal Library](https://www.npmjs.com/package/react-modal)

All icons found on the site is from **Flaticon** and are free to use.
 - [flaticon.com](https://www.flaticon.com/)

