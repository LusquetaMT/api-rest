# Configuration

First things first, we need to install and config our database. This API use as default mysql running in a docker container

## Docker

1. Installing mysql image

```sh
docker run --name <container_name> -e MYSQL_ROOT_PASSWORD=<mysql_password> -p <machine_port>:<docker_port> mysql
```

2. Visualizing container id

```sh
docker ps -a
```

3. Starting container

```sh
docker start <container_id>
```

---

## Start a new project

Create a new directory for the application, or just clone this repository
Make sure you have node.js installed in your machine, otherwise the application won't work

Start a new project with npm

```sh
npm init -y
```

---

## Mysql & Enviroment variables

### Enviroment config

There is a _.env.example_ file in the repository, replace the empty fields with your mysql credentials, then rename the file name to _.env_. Example:

```
DATABASE=api_rest
DATABASE_HOST=
DATABASE_PORT=3306
DATABASE_USERNAME=myusername
DATABASE_PASSWORD=randompassword123

TOKEN_SECRET=KLASDOWIQEASLDÇKLJNDFT9823JFKSDKjlljkfsdjkloisdf
TOKEN_EXPIRATION=7d
```

Token secret is a random string used as key in token validation. It can be any value
Token expiration is the time before the authentication token expires

### MySQL config

Go to src/config/database.js and change the timezone field to your current timezone

---

## Sequelize

Finally, run the following command to apply all migrations in the database

```sh
npx sequelize db:migrate
```

---
