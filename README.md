# codegen-cli

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
cg <templates-name> -h localhost -u root -p root -t db.table
```

#### template-name

The template directory name, currently only supports `zorro-mis-tpl`

#### -h, --host

Database host address

#### -u, --user

Database login user

#### -p, --password

Database login password

#### -t, --table

Database schema name and table name, given in `db.table` format

Example:

```bash
cg zorro-mis-tpl -h localhost -u root -p qwerty -t mydb.t_user
```

## Write your own template

codegen-cli use `art-template` to render files. In order to let you write your own template, I seperate database model and view template, so you just need to know the data format given to template, then you can easily build your templates.

### Data structures

An array of the database table columns information would be sent to template. In `art-template`, you can use `$data` to retrieve them.

```json
{
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
  }, ...]
}
```

> `type` is not the database(MySQL) data types, but JavaScript types, which includes `number`/`string`/`date` 

## TODO

A lot of features are still under developing...

- [ ] Seperate template from cli tool into a different repo
- [ ] Support other template engine(like ejs...)
- [ ] Camel-case tranforming
- [ ] Allow database table prefix
- [ ] Allow variables in filename
- [ ] Generation process info in terminal

