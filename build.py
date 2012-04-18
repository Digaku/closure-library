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

from os import mkdir, path, sep
from subprocess import call

compiler_jar = sep.join(['..', 'closure-compiler', 'compiler.jar'])
closure_dir = sep.join(['..', 'closure-library', 'closure'])
calcdeps = sep.join([closure_dir, 'bin', 'calcdeps.py'])
#targets = [{'src': 'src1.js',
#            'out': sep.join(['build', 'out1-comp.js'])},
#           {'src': sep.join(['gadgets', 'example.js']),
#            'out': sep.join(['build', 'example-comp.js'])},
#           {'src': 'bookmarklet.js',
#            'out': sep.join(['build', 'bookmarklet-comp.js']),
#            'ext': 'bookmarklet-externs.js'}]

if not path.isdir('build'):
    mkdir('build')

for t in targets:
    flags = [calcdeps, '-o', 'compiled', '--compiler_jar=' + compiler_jar,
             '-p', closure_dir, '-p', '.', '--output_file=' + t['out'], '-i',
             t['src'],
             '-f', '--compilation_level=ADVANCED_OPTIMIZATIONS',
             '-f','--warning_level=VERBOSE'
            ]
    if 'ext' in t:
        flags.extend(['-f', '--externs=' + t['ext']])
    call(flags)
