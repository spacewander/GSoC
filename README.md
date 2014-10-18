## warning

This project has not been finished yet.

## description

**GSoC** is a commandline tool which helps you search/filter projects in [Google Summer of Code](https://www.google-melange.com/gsoc/homepage/google/gsoc2015)

## usage

    # first, you need to call
    $ GSoC init # to download the required data

    # Then you can ...
    $ GSoC # list projects in current year
    
    $ GSoC 2014 # list projects in 2014

    $ GSoC 2012-2014 # list projects existed in 2012, 2013, and 2014
    
    $ GSoC 2014 -t ruby -t java # list projects with tag 'ruby' and 'java', in 2014
    
    $ GSoC 2014 -n Rails # search for project contains 'Rails', in 2014
    
    $ GSoC 2014 -n Rails -t web # search for project contains 'Rails' and with tag 'web', in 2014

    $ GSoC 2014 -n R -t web -t ruby # search for projects contains 'R'( or 'r' as it is case-insentent ) and with both tag ' web' and 'ruby'

## license

GPL
