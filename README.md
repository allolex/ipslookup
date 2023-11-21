# IP Coordinates Lookup

A tool for looking up coordinates based on an IP address.

## Usage

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

## Output format

`latitude,longitude`

```shell
$ npm run lookup 192.124.249.29
33.65753173828125,-117.1891098022461
```

## Development

Define `IPSTACK_API_KEY` in an `.env` file in the project root and the `dotenv` library will load the variable into 
`process.env`.

### Notes

This provides similar functionality to the [Postgres GeoIP extension](https://github.com/tvondra/geoip).

The IPStack API isn't secure (e.g. plain HTTP using GET) and lookups can leak information about customers and their 
devices.

All tests were done manually. Automated tests are desirable for any production code, but were not in scope for the time
budgeted for this project.

`npm`'s log level is set to silent in the `.npmrc` so the echoed commands don't taint the output.

It's possible to use a tool like [pkg](https://github.com/vercel/pkg) to create an executable file, but the MacOS 
requirement makes that task difficult since all executables for the Apple Silicon architecture have to be code signed.

### Requirements

#### Listed requirements

- [X] Command line only - no GUI wanted or needed. Please don’t do a GUI
- [X] Must run on linux or MacOS terminal at the command line, accepting a command line parameter and
returning the data desired
- [X] Any language you choose other than bash or curl
- [X] You may not use any libraries that implement this API for you
- [X] The challenge is to do a simple REST implementation of this protocol yourself
- [X] Consider security in your solution, even if it’s just discussing it in your README
- [X] Program must accept a command line parameter of an IP address
- [X] Program must query the API for a result over the network
- [X] Program must output the latt/long of that address in some useful way to the user at the command line

#### Contextual requirements

- [X] Must run in Linux
- [X] Must run in MacOS
- [X] Must adhere to Unix principles (I have interpreted this as command pipeline support.)
- [X] No Bash or curl
