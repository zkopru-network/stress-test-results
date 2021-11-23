# Zkopru Stress Test Results

## Starting

1. `npm install` or `yarn`;
2. `yarn start`;

To view the project you can open `http://localhost:8000`.

## Drone CI Setup

Before registering this repository on the drone server, you must have to check to exist the `publisher` image is on the host running the drone server. the `stress-test/publisher` image is consists of node and git with ssh key. the key has to be registered as the account ssh key or deploy key on the target repository, in here `stress-test-results`. In case the key on the account, the account must be invited from the `zkopru-network/stress-test-results` as collaborator.  If you want to know more about the key(=deploy key, =ID_RSA) see [here](https://docs.github.com/en/developers/overview/managing-deploy-keys).

You can build `stress-test/publisher` image below command.

```shell
 stress-test-results# docker build -f publisher.dockerfile --build-arg ID_RSA --build-arg EMAIL=zkorpru.bot@protonmail.com --build-arg NAME="Zkopru-bot" -t stress-test/publisher .
```

Note that, the `ID_RSA` variable is generated rsa key from your machine. than must register it `zkopru-network/stress-test-resluts` repo as `Deploy Keys`.
