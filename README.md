# codegen-cli

[![npm](https://img.shields.io/npm/v/codegen-cli.svg?style=flat-square)](https://npmjs.com/package/codegen-cli)
[![npm](https://img.shields.io/npm/dm/codegen-cli.svg?style=flat-square)](https://npmjs.com/package/codegen-cli)
[![Travis](https://img.shields.io/travis/ryancui-/codegen-cli.svg?style=flat-square)]()

A CLI code generator specially for frontend developers to generate repeatly codes from database.

## Why this

Long time ago, we had a Java code generator that can read database table information and generate `.java` files (like JavaBean, Controller, Service, etc) and `.js`/`.html` files (using jQuery and EasyUI) for a basic CURD page.

Nowadays, we don't use jQuery or EasyUI any longer. But we still working on some MIS systems which also needs many many CURD pages. Though we are using Angular and NG-ZORRO-ANTD, code generator is still useful.

Instead of configuring Java environments(jdk, gradle, maven, etc...), I prefer using some cli-tool like `vue-cli`, `angular-cli` that frontend developers are familiar with.

## Install

```bash
npm i -g codegen-cli
```

## Usage

```bash
cg <templates-repo> --host localhost --user root --password root --schema db --table table
```

#### template-repo

The template repository name in Github, given by `user/repo` format

#### --host

Database host address

#### --user

Database login user

#### --password

Database login password

#### --schema

Database schema

#### --table

Database table name

#### --db

Tell the cli the templates needs database information, and there is a interact interface for you to input database config needed

#### --component-name

The component name, currently only supports bar-seperated format, like `a-b-ccc`

Example:

Give everything in command

```bash
cg ryancui-/zorro-mis-tpl --host localhost --user root --password qwerty --schema mydb --table t_user --component-name user-page
```

Use interact input

```bash
$ cg ryancui-/zorro-mis-tpl --db
? Input database <host>: 
? Input database <user>: 
? Input database <password>: 
? Input database <schema>: 
? Input database <table>: 
? Input component name: 
```

## Write your own template

codegen-cli use `art-template` to render files. In order to let you write your own template, I seperate database model and view template, so you just need to know the data format given to template, then you can easily build your templates.

### Data structures

An array of the database table columns information would be sent to template. In `art-template`, you can use `$data` to retrieve them.

```json
{
  "component": "order-detail",
  "columns": [{
    "column": "product_price",
    "comment": "The product price",
    "type": "number",
    "allowNull": false
  }, {
    "column": "description",
    "comment": "Description",
    "type": "string",
    "allowNull": true
  }]
}
```

> `type` is not the database(MySQL) data types, but JavaScript types, which includes `number`/`string`/`date` 

## TODO

A lot of features are still under developing...

- [x] Seperate template from cli tool into a different repo
- [ ] Support other template engine(like ejs...)
- [x] Camel-case tranforming
- [ ] Allow database table prefix
- [x] Allow variables in filename
- [x] Generation process info in terminal

