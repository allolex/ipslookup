#!/usr/bin/env node

import "dotenv/config"
import yargs from "yargs"
import {hideBin} from "yargs/helpers"
import {isIP} from "net"
import axios from "axios"
import axiosRetry from "axios-retry"

// Configure retry request on failure three times with exponential backoff
axiosRetry(axios, {retries: 3, retryDelay: axiosRetry.exponentialDelay})

// The IpStack API key should remain secret, so we will store it in the environment.
const apiKey = process.env["IPSTACK_API_KEY"]

if (!apiKey) {
    process.stderr.write("IPSTACK_API_KEY must be defined in your environment.")
    process.exit(1)
}

yargs(hideBin(process.argv)).scriptName("ipstack")
    .usage("$0 <cmd> [ip]")
    .command(
        "lookup [ip]",
        "look up the coordinates of the provided IP v4 address",
        (yargs) => {
            yargs.positional("ip", {
                type: "string",
                describe: "The IP v4 address to look up"
            })
        },
        async (argv) => {
            const {ip} = argv

            // Light validation of IP address
            // TODO: Exclude private IP ranges
            if (!isIP(String(ip))) {
                process.stderr.write("You must provide a IP v4 address")
                process.exit(1)
            }

            const lookupUrl = `http://api.ipstack.example.com/${ip}?access_key=${apiKey}`

            const response = await axios.get(lookupUrl)
                .catch(error => {
                    process.stderr.write(`Could not get coordinates: [Error code: ${error.errno}] ${error.message}`)
                    process.exit(1)
                })

            if (response) {
                const {latitude, longitude} = response.data

                // More human-readable, but harder to parse for piping operations.
                // process.stdout.write(`\n{\n\tlatitude: ${latitude},\n\tlongitude: ${longitude}\n}\n`)
                // TODO: Implement flags to switch output between human-readable and command pipeline-friendly.
                process.stdout.write(`${latitude},${longitude}\n`)
                process.exit(0)
            }

        }
    )
    .strict()
    .help()
    .argv