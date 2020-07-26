# QA-API

## Building and running on localhost

1. Install Dependencies:

```sh
npm install
```

2. Open Up Terminal Shell and Go To Root Directory of Module.

3. Execute Docker Compose File (Detached Mode):

```sh
docker-compose up -d
```

4. Both Web Server and Database Containers Should Now Be Running.

5. To View Containers:

```sh
docker ps
```

## Tech Stack

- MySQL
- Node.js
- Express
- Babel
- Docker

## Git Feature Branch Workflow

Check Status Through:

```sh
git status
```

1. Pull Down Changes From Master and Create New Local Feature Branch:

```sh
git checkout master
git pull origin master
git checkout -b <branchname>
```

OR, Checkout Existing Feature Branch:

```sh
git checkout <branchname>
```

2. Make and Commit Any File Changes

AND, If You Realize You’ve Accidentally Made Your Changes on Master:

```sh
git stash
git checkout -b <branchname> OR, git checkout <branchname>
git stash pop
```

3. Pull Changes from Remote Master Branch to Local Feature Branch

```sh
git pull origin master
```

4. Create and Push Changes to Remote Feature Branch if Need Be

```sh
git push -u origin <branchname>
```

OR, Push Changes to Existing Remote Feature Branch

```sh
git push origin <branchname>
```

5. Create Pull Request on Github

6. Merge Code with Team

7. Pull Down Changes From Remote Master to Local Master
