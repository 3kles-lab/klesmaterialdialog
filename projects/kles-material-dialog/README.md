# @3kles/kles-material-dialog
@3kles/kles-material-dialog is a angular library to create dialog.

## Changelog

Check out the [changelog](./CHANGELOG.md) to check all the latest changes.

## Models

### Components

- <b>AlertDialogComponent</b> -> Component to create an alert dialog
- <b>ConfirmDialogComponent</b> -> Component to create a confirm dialog
- <b>SpinnerDialogComponent</b> -> Component to create a spinner dialog
- <b>KlesDynamicFormDialogComponent</b> -> Component to create a dialog with a form

## Install

### npm

```
npm install --save @3kles/kles-material-dialog
```

## How to use

```javascript
constructor(protected dialog: MatDialog) {}

open(): void {
    this.dialog.open(DialogComponent, {
        data: {
            ...
        },
        ...
    });
}
```

Check the [`documentation`](https://doc.3kles-consulting.com/#/material/dialog) to use component and directive.

## Tests

```
npm install
npm test
```

## License

[`MIT`](./LICENSE.md)
