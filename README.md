# hackathon-pollen

Project for packhacks 2019 to display pollution level in an area in an easy to interpret way

Health data sourced from: [wikipedia](https://en.wikipedia.org/wiki/Air_quality_index)

## App/Website

The website (mobile friendly!) pulls from an online API to collect pollution data and then parses it into easy to understand terms.
There is a "chat" component as well which allows for users to communicate with each other in a local context.
The goal of the website, as a whole, is to be easy to use for _anybody_, enabling people to truly understand and be more connected with the things that affect them.

## Physical component

We also developed schematics for a physical device which can be used to locally measure air quality and communicate using a bluetooth chip with a user's phone or computer.
The intended purpose of the ground station is to allow for more precise data collection for people, as there is quite a difference between air pollution at one's home and in a more regional level.
Ideally, with the support of Google Maps's API we would be able to display data in a more specific way.
[!schematic](docs/images/schematic.png)