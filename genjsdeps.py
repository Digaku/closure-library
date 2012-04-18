#!/usr/bin/env python

# Copyright 2010 Steven Dee. All Rights Reserved.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to
# deal in the Software without restriction, including without limitation the
# rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
# sell copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
# FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
# IN THE SOFTWARE.

from os import chdir, sep
from os.path import basename
from sys import path
from subprocess import call, PIPE

# Closure library directory relative to project root.
closuredir = sep.join(['..', 'closure-library', 'closure'])
# Project directory relative to the location of base.js (see below.)
projdir = sep.join(['..', '..', '..', basename(path[0])])

# Per erik.arvidsson@gmail.com:
# > It is a bit tricky to get the paths correct but I found that running
# > the script from the same directory as base.js works for me.
# > Something like:
# >
# > ../bin/calcdeps.py -o deps -p ../../../test/ > ../../../test/deps.js
chdir(sep.join([closuredir, 'goog']))
calcdeps = sep.join(['..', 'bin', 'calcdeps.py'])
with open(sep.join([projdir, 'deps.js']), 'w') as depsjs:
    call([calcdeps, '-o', 'deps', '-p', projdir], stdout=depsjs, stderr=PIPE)
