# coa-code-challenge-backend
Code challenge solution to query GTFS data for CapMetro routes

## Overview

This is a solution for the [dtif-dev-challenges](https://github.com/cityofaustin/dtif-dev-challenges/blob/master/backend) **Backend Challenge**.

## How It Works

### Graphiql

Navigate to:

~~[https://coa-code-challenge.herokuapp.com/graphiql]~~

Then, perform Graphql queries on GTFS data for CapMetro routes.

#### Examples

*List the available routes:*

    {allRoutes{edges{node{routeId routeLongName}}}}

*List the trips for a specified route:*

    {allTrips(condition: {routeId:19}) {totalCount nodes {routeId tripId}}}

*List the stops for a specified trip:*

    {allStopTimes(condition: {tripId: 2036041}) {nodes {tripByTripId {routeId} stopId stopByStopId {stopName}}}}

---

### Postman

Using [Postman](https://www.getpostman.com/) send a POST request to endpoint:

[https://coa-code-challenge.herokuapp.com/graphql](https://coa-code-challenge.herokuapp.com/graphql)

Make sure to send a raw request with Content-Type as application/json

#### Examples

*List the available routes:*

    {"query": "{allRoutes{edges{node{routeId routeLongName}}}}"}

*List the trips for a specified route:*

    {"query": "{allTrips(condition: {routeId:19}) {totalCount nodes {routeId tripId}}}"}

*List the stops for a specified trip:*

    {"query": "{allStopTimes(condition: {tripId: 2036041}) {nodes {tripByTripId {routeId} stopId stopByStopId {stopName}}}}"}
