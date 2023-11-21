#!/usr/bin/env node

import "dotenv/config"
import yargs from "yargs"
import {hideBin} from "yargs/helpers"
import {isIP} from "net"
import axios from "axios"

// The IpStack API key should remain secret, so we will store it in the environment.
const apiKey = process.env["IPSTACK_API_KEY"]

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
            const { ip } = argv

            // Light validation of IP address
            // TODO: Exclude private IP ranges
            if (!isIP(String(ip))) {
                process.stderr.write("You must provide a IP v4 address")
                process.exit(1)
            }

            const lookupUrl = `http://api.ipstack.com/${ip}?access_key=${apiKey}`
            const response = await axios(lookupUrl)
            const { latitude, longitude } = response.data

            // More human-readable, but harder to parse for piping operations.
            // process.stdout.write(`\n{\n\tlatitude: ${latitude},\n\tlongitude: ${longitude}\n}\n`)
            // TODO: Implement flags to switch output
            process.stdout.write(`${latitude},${longitude}\n`)

            process.exit(0)
        }
    )
    .strict()
    .help()
    .argv