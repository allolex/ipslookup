# IP Coordinates Lookup

A tool for looking up coordinates based on an IP address.

## Synopsis

`IPSTACK_API_KEY=[your_key] LOOKUP_IP=[ip_address] make lookup`

or 

`IPSTACK_API_KEY=[your_key] npm run lookup [ip_addess]`


## Use notes

You will need to somehow define the `IPSTACK_API_KEY` variable in your environment. You can get a key by signing up at 
[IPStack][IPSTACK_SIGNUP].

There are instructions below for both containerized and local use.

## Docker container use

We can use `docker run` to run the lookup within a container. In addition to the `IPSTACK_API_KEY`, you will need to
pass in an environment variable called `LOOKUP_IP`. There are instructions for that below.

There is a `Makefile` defined for this project, with the following actions:

### `build`

Build the container before use.

```shell
make build
```
This will pull the node image and build the IPStack lookup CLI within a Docker container.

### `lookup`

```shell
LOOKUP_IP=192.124.249.29 IPSTACK_API_KEY=your_key make lookup
```

will return the coordinates, e.g. 

```shell
$ IPSTACK_API_KEY=your_key LOOKUP_IP=192.124.249.29 make lookup
33.65753173828125,-117.1891098022461
```

### `shell`

Opens the `sh` shell inside a container instance.

```shell
$ make shell
docker run \
		-it \
		-e IPSTACK_API_KEY=[REDACTED] \
		-e LOOKUP_IP= \
		--entrypoint /bin/sh \
		ipstack/lookup
/usr/app #
```

## Local use

### Build

You will need to have a recent working Node.js installed on your system. 

First, clone the repository, then

```shell
npm install
npm run build
```

That will compile the Typescript to Javascript so the tool can be used.

### Usage

Ensure you have your IpStack API key defined in your local environment as:

```shell
IPSTACK_API_KEY=your_key
```

Then run the command:

```shell
npm run lookup [IP_ADDRESS]
```

Alternatively, you can run the command as

```shell
IPSTACK_API_KEY=your_key npm run lookup [IP_ADDRESS]
```

### Output format

`latitude,longitude`

```shell
$ npm run lookup 192.124.249.29
33.65753173828125,-117.1891098022461
```

## Development

Define `IPSTACK_API_KEY` in an `.env` file in the project root and the `dotenv` library will load the variable into 
`process.env`.

For developing using the Docker containers and testing commands, you may consider using [direnv][DIRENV]

### Notes

This provides similar functionality to the [Postgres GeoIP extension][POSTGRES_GEOIP].

The IPStack API isn't secure (e.g. plain HTTP using GET) and lookups can leak information about customers and their 
devices.

All tests were done manually. Automated tests are desirable for any production code, but were not in scope for the time
budgeted for this project.

`npm`'s log level is set to silent in the `.npmrc` so the echoed commands don't taint the output.

It's possible to use a tool like [pkg][PKG] to create an executable file, but the macOS 
requirement makes that task difficult since all executables for the Apple Silicon architecture have to be code signed.

### Requirements

#### Listed requirements

- [X] Command line only - no GUI wanted or needed. Please don’t do a GUI
- [X] Must run on linux or macOS terminal at the command line, accepting a command line parameter and
returning the data desired
- [X] Any language you choose other than bash or curl
- [X] You may not use any libraries that implement this API for you
- [X] The challenge is to do a simple REST implementation of this protocol yourself
- [X] Consider security in your solution, even if it’s just discussing it in your README
- [X] Program must accept a command line parameter of an IP address
- [X] Program must query the API for a result over the network
- [X] Program must output the lat/long of that address in some useful way to the user at the command line

#### Contextual requirements

- [X] Must run in Linux
- [X] Must run in macOS
- [X] Must adhere to Unix principles (I have interpreted this as command pipeline support.)
- [X] No Bash or curl

[DIRENV]: https://direnv.net
[IPSTACK_SIGNUP]: https://ipstack.com/signup/free
[POSTGRES_GEOIP]: https://github.com/tvondra/geoip
[PKG]: https://github.com/vercel/pkg